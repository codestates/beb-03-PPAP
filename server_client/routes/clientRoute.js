// import { authClient } from '../controller/authController.js';
// import express from "express";

const {
  register,
  login,
  storePassportVC,
  storeVisaVC,
  storeStampVC,
  getPassportVC,
  getVisaVC,
  getStampVC,
} = require("../controller/clientController.ts");
const express = require("express");
const clientRoute = express.Router();

clientRoute.route("/login").post(login);
clientRoute.route("/register").post(register);
clientRoute.route("/storePassportVC").post(storePassportVC);
clientRoute.route("/storeVisaVC").post(storeVisaVC);
clientRoute.route("/storeStampVC").post(storeStampVC);
clientRoute.route("/getPassportVC").get(getPassportVC);
clientRoute.route("/getVisaVC").get(getVisaVC);
clientRoute.route("/getStampVC").get(getStampVC);

module.exports.clientRoute = clientRoute;
