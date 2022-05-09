const { authClient } = require("../controller/authController.js");
// import { authClient } from '../controller/authController.js';
const express = require("express");
// import express from "express";
const authRoute = express.Router();
authRoute.route("/authClient").post(authClient);

module.exports.authRoute = authRoute;
