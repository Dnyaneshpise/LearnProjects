// const express = require('express');
import express from "express"; //esm 

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";

import tvRoutes from "./routes/tv.route.js";

import searchRoutes from "./routes/search.route.js";

import  { protectRoute }  from "./middleware/protectRoute.js";

import cookieParser from "cookie-parser";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const {PORT}=ENV_VARS;

app.use(express.json()); // will allow us to parse req.body if its a json object.
app.use(cookieParser());


app.use("/api/v1/auth",authRoutes); // if we hit this(/api/v1/auth) endpoint then use this file

app.use("/api/v1/movie",protectRoute ,movieRoutes);

app.use("/api/v1/tv",protectRoute ,tvRoutes);

app.use("/api/v1/search",protectRoute ,searchRoutes);

app.listen(PORT,()=>{
    console.log("Server started at port:"+ PORT);
    // when server started connnect it with DB 
    connectDB();
});


