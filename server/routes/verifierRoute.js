// import {
//     verifyPassport,
//     verifyVisa,
//     mintStampNFT,
// } from '../controller/verifierController.js';
const { verifyPassport } = require("../controller/verifierController.ts");

// import express from "express";
const express = require("express");

const verifierRoute = express.Router();

verifierRoute.route("/veriPass").post(verifyPassport);
// verifierRoute.route("/veriVisa").post(verifyVisa);
// verifierRoute.route("/mintStamp").post(mintStampNFT);

// export default verifierRoute;
module.exports.verifierRoute = verifierRoute;
