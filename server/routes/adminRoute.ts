import {
  makePassport,
  makeVisa,
  verifyPassport,
  adminLogin,
  getPassportRequests,
  getVisaRequests,
  giveStamp,
  storeHolderDidAndVp,
} from "../controller/adminController";

import express from "express";
const adminRoute = express.Router();

adminRoute.route("/makePass").post(makePassport);
adminRoute.route("/veriPass").post(verifyPassport);
adminRoute.route("/makeVisa").post(makeVisa);
adminRoute.route("/adminlogin").post(adminLogin);
adminRoute.route("/passportRequests").get(getPassportRequests);
adminRoute.route("/visaRequests").get(getVisaRequests);
// adminRoute.route("/getStamp").get(getStamp);
adminRoute.route("/giveStamp").post(giveStamp);
adminRoute.route("/storeVp").post(storeHolderDidAndVp);

module.exports.adminRoute = adminRoute;
