import { verifyPassport } from "../controller/verifierController";
import express from "express";
const verifierRoute = express.Router();

verifierRoute.route("/veriPass").post(verifyPassport);

module.exports.verifierRoute = verifierRoute;
