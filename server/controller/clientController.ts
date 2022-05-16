const query = require("../mysql/query/query");
import { Request, Response, NextFunction } from "express";
import {
  JwtCredentialPayload,
  createVerifiableCredentialJwt,
} from "did-jwt-vc";
import { getOnlyPassport } from "../functions/client";
import { auth } from "../functions/auth";
import createIssuerDID from "../functions/createIssuerDID";

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
  // add user photo data
  if (!clientInfo) {
    return res.status(401).send({ data: null, msg: "Invalid token" });
  }
  clientInfo.photo_uri = photo_uri;

  // submit request for issuing passport
  await query.requestPassForm(clientInfo, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    if (data === "0") {
      // already exist request
      // request form data would be returned?
      res.status(401).send({
        data: null,
        msg: "Your request is already transfered",
      });
    } else if (data === "1") {
      res.status(401).send({
        data: null,
        msg: "You already have passport",
      });
    } else if (data === "2") {
      res.status(401).send({
        data: null,
        msg: "Your request is rejected",
      });
    } else {
      // no request -> submit new request to DB
      res.status(200).send({
        data: null,
        msg: "Your request is sucessfully submitted",
      });
    }
  });
};

export const getPassport = async (req: Request, res: Response) => {
  // JWT token from authorization header
  const authorization = req.headers["authorization"];
  // specify user using user data in DB
  const clientInfo: any = await new Promise((resolve) => {
    resolve(clientAuth(authorization));
  });
  if (!clientInfo) {
    return res.status(401).send({ data: null, msg: "Invalid token" });
  }

  // recall passport
  const passData = await getOnlyPassport(clientInfo);
  if (passData.statusCode) {
    return res
      .status(passData.statusCode)
      .send({ data: null, msg: passData.msg });
  }
  clientInfo.photo_uri = passData.data[0].photo_uri;
  const passId = passData.data[0].passport_id;

  const visaList = await new Promise((resolve) => {
    query.getUser(
      "GOVERN_FA_VISA_SURVEY",
      "passport_id",
      passId,
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          resolve(data);
        }
      }
    );
  });

  const stampList = await new Promise((resolve) => {
    query.getUser(
      "GOVERN_FA_STAMP",
      "passport_id",
      passId,
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          resolve(data);
        }
      }
    );
  });

  if (visaList && stampList) {
    const issuer: any = await createIssuerDID();
    const vcPayload: JwtCredentialPayload = {
      sub: clientInfo.did,
      nbf: 1562950282,
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential"],
        credentialSubject: {
          passportInfo: clientInfo,
          visaList: visaList,
          stampList: stampList,
        },
      },
    };
    const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer);

    req.session.vcJwt = vcJwt;

    res.status(200).send({
      data: null,
      msg: "get passport information success",
    });
  }
};

export const requestVisa = async (req: Request, res: Response) => {
  const { visa_purpose } = req.body;
  // JWT token from authorization header
  const authorization = req.headers["authorization"];
  // specify user using user data in DB
  const clientInfo: any = await new Promise((resolve) => {
    resolve(clientAuth(authorization));
  });
  if (!clientInfo) {
    return res.status(401).send({ data: null, msg: "Invalid token" });
  }

  // recall passport
  const passData = await getOnlyPassport(clientInfo);
  if (passData.statusCode) {
    return res
      .status(passData.statusCode)
      .send({ data: null, msg: passData.msg });
  }
  clientInfo.passport_id = passData.data[0].passport_id;

  // find visa type
  const condOption = {
    visa_purpose: visa_purpose,
    country_code: clientInfo.country_code,
  };
  // check requested visa is available
  const visaType: any = await new Promise((resolve) => {
    query.getUserMultiCond(
      "GOVERN_FA_VISA",
      condOption,
      (err: any, data: any) => {
        if (!data) {
          return res.status(400).send({
            data: null,
            msg: "No available for your request",
          });
        }
        resolve(data);
      }
    );
  });
  clientInfo.visa_id = visaType[0].visa_id;

  // submit request for issuing passport
  await query.requestVisaForm(clientInfo, (err: any, data: any) => {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    if (!data) {
      // already exist request
      res.status(401).send({
        data: null,
        msg: "Your request is already transfered",
      });
    } else {
      // no request -> submit new request to DB
      res.status(200).send({
        data: null,
        msg: "Your request is sucessfully submitted",
      });
    }
  });
};

// export const test = async (req: Request, res: Response) => {
//     return new Promise((resolve) => {
//         query.joinTables((req: any, res: any) => {
//             console.log(res);
//         });
//     });
// };
