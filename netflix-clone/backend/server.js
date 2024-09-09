// const express = require('express');
import express from "express"; //esm 

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const {PORT}=ENV_VARS;

app.use(express.json()); // will allow us to parse req.body if its a json object.


app.use("/api/v1/auth",authRoutes); // if we hit this(/api/v1/auth) endpoint then use this file

app.use("/api/v1/movie",movieRoutes);

app.listen(PORT,()=>{
    console.log("Server started at port:"+ PORT);
    // when server started connnect it with DB 
    connectDB();
});


