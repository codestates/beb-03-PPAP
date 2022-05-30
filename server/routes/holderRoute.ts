import {
  requestPassport,
  getReqPass,
  issuePassVC,
  getAvailableVisa,
  requestVisa,
  getReqVisaList,
  issueVisaVC,
  test,
  getStampNFTs,
} from "../controller/holderController";

import express from "express";
const holderRoute = express.Router();

// routing related to issue passport VC
holderRoute.route("/reqPass").post(requestPassport);
holderRoute.route("/getReqPass").get(getReqPass);
holderRoute.route("/issuePassVC").get(issuePassVC);

// routing related to issue visa VC
holderRoute.route("/getAvailVisa").get(getAvailableVisa);
holderRoute.route("/reqVisa").post(requestVisa);
holderRoute.route("/getReqVisaList").get(getReqVisaList);
holderRoute.route("/issueVisaVC").post(issueVisaVC);
holderRoute.route("/getStampNFTs").get(getStampNFTs);

// test for generate sample VP using passport VC
holderRoute.route("/test").post(test);

module.exports.holderRoute = holderRoute;
