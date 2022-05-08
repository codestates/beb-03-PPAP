// import {
//     getPassport,
//     authPassport,
//     requestPassport,
//     makePassport,
//     requestVisa,
//     makeVisa,
// } from '../controller/issuerController.js';
const {
  getPassport,
  authPassport,
  requestPassport,
  makePassport,
  requestVisa,
  makeVisa,
} = require("../controller/issuerController.js");

// import express from "express";
const express = require("express");
const issuerRoute = express.Router();

issuerRoute.route("/getPass").get(getPassport);
issuerRoute.route("/authPass").get(authPassport);

issuerRoute.route("/reqPass").post(requestPassport);
issuerRoute.route("/makePass").post(makePassport);

issuerRoute.route("/reqVisa").post(requestVisa);
issuerRoute.route("/makeVisa").post(makeVisa);

// export default issuerRoute;
module.exports.issuerRoute = issuerRoute;
