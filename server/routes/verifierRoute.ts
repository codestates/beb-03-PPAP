import { verifyPassport } from "../controller/verifierController";
// const { verifyPassport } = require("../controller/verifierController.ts");

import express from "express";
const verifierRoute = express.Router();

verifierRoute.route("/veriPass").get(verifyPassport);

// export default verifierRoute;
module.exports.verifierRoute = verifierRoute;
