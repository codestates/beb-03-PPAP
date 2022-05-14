import {
  makePassport,
  makeVisa,
  verifyPassport,
  adminLogin,
  getPassportRequests,
  getVisaRequests,
} from "../controller/adminController";

import express from "express";
const adminRoute = express.Router();

adminRoute.route("/makePass").post(makePassport);
adminRoute.route("/veriPass").post(verifyPassport);
adminRoute.route("/makeVisa").post(makeVisa);
adminRoute.route("/adminlogin").post(adminLogin);
adminRoute.route("/passportRequests").get(getPassportRequests);
adminRoute.route("/visaRequests").get(getVisaRequests);

module.exports.adminRoute = adminRoute;
