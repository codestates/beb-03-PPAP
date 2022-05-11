import {
  makePassport,
  makeVisa,
  verifyPassport,
  adminLogin,
} from "../controller/adminController";

import express from "express";
const adminRoute = express.Router();

adminRoute.route("/makePass").post(makePassport);
adminRoute.route("/veriPass").post(verifyPassport);
adminRoute.route("/makeVisa").post(makeVisa);
adminRoute.route("/adminlogin").post(adminLogin);

module.exports.adminRoute = adminRoute;
