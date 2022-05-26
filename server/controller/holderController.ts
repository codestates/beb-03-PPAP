const query = require("../mysql/query/query");
const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import {
  JwtCredentialPayload,
  createVerifiableCredentialJwt,
  JwtPresentationPayload,
  createVerifiablePresentationJwt,
  verifyPresentation,
  verifyCredential,
} from "did-jwt-vc";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import {
  getApprovedPassportData,
  getApprovedVisaData,
} from "../functions/holder";
import { auth } from "../functions/auth";
import createIssuerDID from "../functions/createIssuerDID";
const didContractAdd = process.env.DIDCONTRACTADD;
/* import moralis */
const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;
const masterKey = process.env.MASTER_KEY;

const clientAuth = async (authorization: any) => {
  let output: any = await auth(authorization);
  return output;
};

export const requestPassport = async (req: Request, res: Response) => {
  const { photo_uri } = req.body;
  // JWT token from authorization header
  const authorization = req.headers["authorization"];
  // specify user using user data in DB
  const clientInfo: any = await new Promise((resolve) => {
    resolve(clientAuth(authorization));
  });
  // case when token is not valid
  if (clientInfo.name == "JsonWebTokenError") {
    console.log("invalid token");
    return res.status(400).send({ data: null, msg: "invaild token" });
  }
  // add user photo data
  clientInfo.photo_uri = photo_uri;

  // submit request for issuing passport
  await query.requestPassForm(clientInfo, (err: any, data: any) => {
    if (err) {
      console.log("ERROR : ", err);
      res.status(400).send(err);
    }
    if (!data) {
      console.log(
        "user already has passport vc, but user submit request once more",
      );
      return res.status(400).send({
        data: null,
        msg: `You already have passport VC.`,
      });
    }

    if (data.affectedRows === 1) {
      // no request -> submit new request to DB
      query.getTargetData(
        "GOVERN_FA_PASSPORT",
        "client_id",
        clientInfo.client_id,
        (err: any, data: any) => {
          console.log("add data success");
          res.status(200).send({
            data: data[0],
            msg: "Your request is sucessfully submitted",
          });
        },
      );
    } else {
      if (data.success_yn === "0") {
        // already exist request
        console.log("request already transfered and not approved");
        res.status(401).send({
          data: null,
          msg: "Your request is already transfered and not approved",
        });
      } else if (data.success_yn === "1") {
        // already exist passport
        console.log("request approved and user doesn't get VC yet");
        res.status(401).send({
          data: null,
          msg: "Your passport is approved. Get your passport.",
        });
      } else if (data.success_yn === "2") {
        // rejected passport
        console.log("user's request is rejected by issuer");
        res.status(401).send({
          data: null,
          msg: "Your request is rejected.",
        });
      }
    }
  });
};

export const getReqPass = async (req: Request, res: Response) => {
  // JWT token from authorization header
  const authorization = req.headers["authorization"];
  // specify user using user data in DB
  const clientInfo: any = await new Promise((resolve) => {
    resolve(clientAuth(authorization));
  });
  // case when token is not valid
  if (clientInfo.name == "JsonWebTokenError") {
    console.log("invalid token");
    return res.status(400).send({ data: null, msg: "invaild token" });
  }

  // get requested passport which user submit request
  await query.getTargetData(
    "GOVERN_FA_PASSPORT",
    "did",
    clientInfo.did,
    async (err: any, data1: any) => {
      if (err) {
        console.log("ERROR : ", err);
        res.status(400).send(err);
      }
      // no request on DB
      if (data1.length === 0) {
        console.log("no request");
        return res.status(200).send({
          data: null,
          msg: "There is no request",
        });
      }
      // data should be displyed containing user information
      const cond = ["client_id", "client_id"];
      await query.joinTable(
        "GOVERN_FA_PASSPORT",
        "GOVERN_USER_CLIENT",
        cond,
        "client_id",
        data1[0].client_id,
        (err: any, data2: any) => {
          if (err) {
            console.log("ERROR : ", err);
            res.status(400).send(err);
          }
          const tempObj: any = Object.assign(data2[0]);
          tempObj.did = clientInfo.did;
          console.log("call requested passport success");
          return res.status(200).send({
            data: { reqPass: tempObj },
            msg: "call requested passport success",
          });
        },
      );
    },
  );
};

export const issuePassVC = async (req: Request, res: Response) => {
  // JWT token from authorization header
  const authorization = req.headers["authorization"];
  // specify user using user data in DB
  const holderInfo: any = await new Promise((resolve) => {
    resolve(clientAuth(authorization));
  });
  // case when token is not valid
  if (holderInfo.name == "JsonWebTokenError") {
    console.log("invalid token");
    return res.status(400).send({ data: null, msg: "invaild token" });
  }

  // recall passport
  const tempPassData = await getApprovedPassportData(holderInfo);
  if (tempPassData.statusCode) {
    return res
      .status(tempPassData.statusCode)
      .send({ data: null, msg: tempPassData.msg });
  }
  const passData = Object.assign(tempPassData.data);

  const condOption = {
    setCond: "did",
    setVal: holderInfo.did,
    findCond: "client_id",
    findVal: holderInfo.client_id,
  };

  // insert user did on GOVERN_USER_CLIENT table
  await query.updateRow(
    "GOVERN_USER_CLIENT",
    condOption,
    async (err: any, data: any) => {
      if (err) {
        console.log("ERROR : ", err);
        res.status(400).send(err);
      }
      if (data.affectedRows === 1) {
        console.log("add did success");
        // delete designated user"s passport request form
        await query.deleteRow(
          "GOVERN_FA_PASSPORT",
          condOption.setCond,
          condOption.setVal,
          (err: any, data: any) => {
            if (err) {
              console.log("ERROR : ", err);
              res.status(400).send(err);
            }
            if (data.affectedRows === 1) {
              console.log("row delete success");
            }
          },
        );
      }
    },
  );

  passData.did = holderInfo.did;

  // get issuer sign (not only issuer DID) to make VC
  const issuer: any = await createIssuerDID();

  // vc payload which contains passport and stamp data
  const vcPassPayload: JwtCredentialPayload = {
    sub: holderInfo.did,
    nbf: 1562950282,
    vc: {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiableCredential"],
      credentialSubject: {
        passportInfo: passData,
      },
    },
  };
  // create vc as JWT token under issuer signing
  const vcPassJwt = await createVerifiableCredentialJwt(vcPassPayload, issuer);

  res.status(200).send({
    data: { vcPassJwt: vcPassJwt },
    msg: "get passport vc success",
  });
};

export const getAvailableVisa = async (req: Request, res: Response) => {
  // specify user using user data in DB
  await query.getAllData("GOVERN_FA_VISA", (err: any, data: any) => {
    if (err) {
      console.log("ERROR : ", err);
    } else {
      if (data.length === 0) {
        // case when available visa is empty
        console.log("no matching data");
        return res.status(400).send({ data: null, msg: "no data matched" });
      } else {
        console.log("get visa information success");
        let countryList: any = [];
        let purposeList: any = [];
        data.forEach((elem: any, idx: number) => {
          countryList.push(elem.country_code);
          purposeList.push(elem.visa_purpose);
        });
        // using Set data type for avoid duplication of element
        countryList = Array.from(new Set(countryList));
        purposeList = Array.from(new Set(purposeList));
        return res.status(200).send({
          data: {
            rawData: data,
            countryList: countryList,
            purposeList: purposeList,
          },
          msg: "get visa information success",
        });
      }
    }
  });
};

export const requestVisa = async (req: Request, res: Response) => {
  const { visa_purpose, target_country, vpPassJwt } = req.body;

  // JWT token from authorization header
  const authorization = req.headers["authorization"];

  // specify user using user data in DB
  const holderInfo: any = await new Promise((resolve) => {
    resolve(clientAuth(authorization));
  });

  // case when token is not valid
  if (holderInfo.name == "JsonWebTokenError") {
    console.log("invalid token");
    return res.status(400).send({ data: null, msg: "invaild token" });
  }

  // case when user submit visa request to own country
  if (holderInfo.user_country_code === target_country) {
    console.log("user requested contry code is equal to user's country");
    return res
      .status(400)
      .send({ data: null, msg: "You can't request visa to your country" });
  }
  // check whether the client has passport or not
  const hasPassport: any = await new Promise((resolve) => {
    query.getTargetData(
      "GOVERN_USER_CLIENT",
      "did",
      holderInfo.did,
      (err: any, data: any) => {
        if (err) {
          console.log("ERROR : ", err);
          res.status(400).send(err);
        }
        resolve(data);
      },
    );
  });

  // case when there is no did in designated user on GOVERN_USER_CLIENT
  if (hasPassport.length === 0) {
    console.log("DB has no issuing record. -> user has no passport");
    return res.status(400).send({
      data: null,
      msg: `You don't have passport. Make passport first.`,
    });
  }

  // verify VP token
  let passData: any;
  const providerConfig = {
    name: "ganache",
    rpcUrl: process.env.RPC_URL,
    registry: didContractAdd,
  };
  const ethrDidResolver = getResolver(providerConfig);
  const didResolver = new Resolver(ethrDidResolver);
  // consider a case when passport VP Jwt token is invalid
  try {
    const verifiedVP = await verifyPresentation(vpPassJwt, didResolver);
    const vcPass = verifiedVP.payload.vp.verifiableCredential[0];
    const verifiedVC = await verifyCredential(vcPass, didResolver);
    passData = verifiedVC.payload.vc.credentialSubject.passportInfo;
  } catch (e) {
    return res
      .status(400)
      .send({ data: null, msg: "invalid input passport VP" });
  }

  // did on holderInfo -> from access token
  // did on passData -> from VP in req.body
  if (holderInfo.did !== passData.did) {
    console.log(
      "did from access token and did from requested body is not same",
    );
    return res.status(400).send({
      data: null,
      msg: "Not identified between token data and passport vc data",
    });
  }

  // option to find visa type
  const condOption = {
    visa_purpose: visa_purpose,
    country_code: target_country,
  };
  // get visa type under pre-setted option
  const visaType: any = await new Promise((resolve) => {
    query.getMultiCondData(
      "GOVERN_FA_VISA",
      condOption,
      (err: any, data: any) => {
        // requested visa doesn"t exist
        if (data.length === 0) {
          console.log("no availale visa");
          return res.status(400).send({
            data: null,
            msg: "No available visa for your request",
          });
        }
        resolve(data);
      },
    );
  });

  // specify requested visa type
  const reqVisa = visaType[0].visa_id;

  const reqForm = { did: passData.did, visa_id: reqVisa };

  // submit request for issuing visa
  await query.requestVisaForm(reqForm, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    if (data.affectedRows == 1) {
      const condOption = {
        did: passData.did,
        visa_id: reqVisa,
      };
      // no request -> submit new request to DB
      query.getMultiCondData(
        "GOVERN_FA_VISA_SURVEY",
        condOption,
        (err: any, data: any) => {
          if (err) {
            console.log("ERROR : ", err);
            res.status(400).send(err);
          }
          console.log("user request is stored in DB");
          res.status(200).send({
            requestedData: data[0],
            msg: "Your request is sucessfully submitted",
          });
        },
      );
    } else {
      // already exist request & not approved
      if (data.success_yn === "0") {
        console.log(
          "user visa request already transfered and not approvred yet",
        );
        res.status(401).send({
          data: null,
          msg:
            "Your request is already transfered and it does not approved yet.",
        });
      } else {
        console.log("user visa request is approved. VC is not issued yet");
        res.status(401).send({
          data: null,
          msg: "Your request is approved. Get your visa",
        });
      }
    }
  });
};

export const getReqVisaList = async (req: Request, res: Response) => {
  // JWT token from authorization header
  const authorization = req.headers["authorization"];
  // specify user using user data in DB
  const holderInfo: any = await new Promise((resolve) => {
    resolve(clientAuth(authorization));
  });
  // case when token is not valid
  if (holderInfo.name == "JsonWebTokenError") {
    console.log("invalid token");
    return res.status(400).send({ data: null, msg: "invaild token" });
  }

  // get all requested visa which user submit request
  // detailed visa information should be displayed
  const cond = ["visa_id", "visa_id"];
  await query.joinTable(
    "GOVERN_FA_VISA_SURVEY",
    "GOVERN_FA_VISA",
    cond,
    "did",
    holderInfo.did,
    (err: any, data: any) => {
      if (err) {
        console.log("ERROR : ", err);
        res.status(400).send(err);
      }
      if (data.length === 0) {
        return res.status(200).send({
          data: null,
          msg: "There are no requests",
        });
      }
      return res.status(200).send({
        data: { reqVisaList: data },
        msg: "call requested visa list success",
      });
    },
  );
};

export const issueVisaVC = async (req: Request, res: Response) => {
  const { visa_survey_id } = req.body;
  // JWT token from authorization header
  const authorization = req.headers["authorization"];
  // specify user using user data in DB
  const holderInfo: any = await new Promise((resolve) => {
    resolve(clientAuth(authorization));
  });
  // case when token is not valid
  if (holderInfo.name == "JsonWebTokenError") {
    console.log("invalid token");
    return res.status(400).send({ data: null, msg: "invaild token" });
  }

  // recall visa
  const reqInfo = { did: holderInfo.did, visa_survey_id: visa_survey_id };
  const visaData: any = await getApprovedVisaData(reqInfo);
  if (visaData.statusCode) {
    return res
      .status(visaData.statusCode)
      .send({ data: null, msg: visaData.msg });
  }

  // get issuer sign (not only issuer DID) to make VC
  const issuer: any = await createIssuerDID();

  // vc payload which contains passport and stamp data
  const vcVisaPayload: JwtCredentialPayload = {
    sub: holderInfo.did,
    nbf: 1562950282,
    vc: {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiableCredential"],
      credentialSubject: {
        visa: visaData,
      },
    },
  };
  // create vc as JWT token under issuer signing
  const vcVisaJwt = await createVerifiableCredentialJwt(vcVisaPayload, issuer);

  // delete designated user's visa request form
  await query.deleteRow(
    "GOVERN_FA_VISA_SURVEY",
    "visa_survey_id",
    visa_survey_id,
    (err: any, data: any) => {
      if (err) {
        console.log("ERROR : ", err);
        res.status(400).send(err);
      }
      if (data.affectedRows === 1) {
        console.log("row delete success");
      }
    },
  );
  console.log("issuing visa VC success");
  res.status(200).send({
    data: { vcVisaJwt: vcVisaJwt },
    msg: "get visa VC success",
  });
};

export const test = async (req: Request, res: Response) => {
  const { vcJwt } = req.body;
  // console.log(vcJwt);
  const issuer: any = await createIssuerDID();
  const vpPayload: JwtPresentationPayload = {
    vp: {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiablePresentation"],
      verifiableCredential: [vcJwt],
    },
  };
  const vpJwt = await createVerifiablePresentationJwt(vpPayload, issuer);
  const providerConfig = {
    name: "ganache",
    rpcUrl: process.env.RPC_URL,
    registry: didContractAdd,
  };
  const ethrDidResolver = await getResolver(providerConfig);
  const didResolver = await new Resolver(ethrDidResolver);
  const verifiedVP = await verifyPresentation(vpJwt, didResolver);

  return res.status(200).send({ data: { vpJwt: vpJwt } });
};

export const getStampNFTs = async (req: Request, res: Response) => {
  await Moralis.start({ serverUrl, appId, masterKey });
  const { address } = req.query;
  const options = {
    chain: "ropsten",
    address: address,
    token_address: process.env.NFTCONTRACTADD,
  };
  const NFTs = await Moralis.Web3API.account.getNFTsForContract(options);
  res.status(200).send({ NFT_list: NFTs.result });
  console.log(NFTs);
  try {
  } catch (e) {
    res.status(400).send({ message: e });
  }
};
