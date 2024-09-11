import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../config/envVars.js';

const { JWT_SECRET } = ENV_VARS;

export const protectRoute = async (req, res, next) => { 
    try {
        const token = req.cookies['jwt-netflix'];
        if (!token) {
            return res.status(401).json({ success:false, message: "You are not authorized to access this route no token provided" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success:false, message: "You are not authorized to access this route - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ success:false, message: "User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(error, "error in protectRoute");
        res.status(500).json({ success:false, message: "Internal Server Error in protect route" });
    }
};