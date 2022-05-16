import {
  makePassport,
  makeVisa,
  verifyPassport,
  adminLogin,
  getPassportRequests,
  getVisaRequests,
  getDepStamp,
  getEntStamp,
} from "../controller/adminController";

import express from "express";
const adminRoute = express.Router();

adminRoute.route("/makePass").post(makePassport);
adminRoute.route("/veriPass").post(verifyPassport);
adminRoute.route("/makeVisa").post(makeVisa);
adminRoute.route("/adminlogin").post(adminLogin);
adminRoute.route("/passportRequests").get(getPassportRequests);
adminRoute.route("/visaRequests").get(getVisaRequests);
adminRoute.route("/getDepStamp").get(getDepStamp);
adminRoute.route("/getEntStamp").get(getEntStamp);

module.exports.adminRoute = adminRoute;
