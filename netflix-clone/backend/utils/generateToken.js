import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},ENV_VARS.JWT_SECRET,{
        expiresIn:"15d"
    });
    const options = {
        expires:new Date(
            Date.now()+15*24*60*60*1000 //15 days in ms
        ),
        httpOnly:true, //prevents cookie from being accessed on client side xss,will make it not accessible via document.cookie in js

        sameSite:"strict" ,//cookie will only be sent in a first-party context and not be sent along with cross-site requests , prevent csrf
        secure:ENV_VARS.Node_ENV === "production" ? true : false //cookie will only be sent in https
    }
    res.cookie("jwt-netflix",token,options);
    
    return token;
}
