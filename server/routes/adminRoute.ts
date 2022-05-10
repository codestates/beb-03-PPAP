import {
  makePassport,
  makeVisa,
  verifyPassport,
} from "../controller/adminController";

import express from "express";
const adminRoute = express.Router();

adminRoute.route("/makePass").post(makePassport);
adminRoute.route("/veriPass").post(verifyPassport);
adminRoute.route("/makeVisa").post(makeVisa);

module.exports.adminRoute = adminRoute;
