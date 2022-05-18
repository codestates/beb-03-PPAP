const query = require("../mysql/query/query");
import { Request, Response, NextFunction } from "express";
import {
  JwtCredentialPayload,
  createVerifiableCredentialJwt,
} from "did-jwt-vc";
import { getOnlyPassport } from "../functions/holder";
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
  if (clientInfo.name == "JsonWebTokenError") {
    return res.status(400).send({ data: null, msg: "invaild token" });
  }
  // add user photo data
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
  if (clientInfo.name == "JsonWebTokenError") {
    return res.status(400).send({ data: null, msg: "invaild token" });
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

  const visaList: any = await new Promise((resolve) => {
    query.getTargetData(
      "GOVERN_FA_VISA_SURVEY",
      "passport_id",
      passId,
      (err: any, data: any) => {
        if (err) {
          console.log("ERROR : ", err);
          res.status(400).send(err);
        }
        if (data.insertId) {
          // no request -> submit new request to DB
          query.getUser(
            "GOVERN_FA_PASSPORT",
            "client_id",
            clientInfo.client_id,
            (err: any, data: any) => {
              res.status(200).send({
                requestedData: data[0],
                msg: "Your request is sucessfully submitted",
              });
            }
          );
        } else {
          if (data.success_yn === "0") {
            // already exist request
            res.status(401).send({
              data: null,
              msg: "Your request is already transfered",
            });
          } else if (data.success_yn === "1") {
            // already exist passport
            res.status(401).send({
              data: null,
              msg: "You already have passport",
            });
          } else if (data.success_yn === "2") {
            // rejected passport
            res.status(401).send({
              data: null,
              msg: "Your request is rejected",
            });
          }
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
    const vcPassPayload: JwtCredentialPayload = {
      sub: clientInfo.did,
      nbf: 1562950282,
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential"],
        credentialSubject: {
          passportInfo: clientInfo,
          stampList: stampList,
        },
      },
    };
    const vcPassJwt = await createVerifiableCredentialJwt(
      vcPassPayload,
      issuer
    );

    const visaPromises = await visaList.map((elem: any, idx: number) => {
      const vcVisaPayload: JwtCredentialPayload = {
        sub: clientInfo.did,
        nbf: 1562950282,
        vc: {
          "@context": ["https://www.w3.org/2018/credentials/v1"],
          type: ["VerifiableCredential"],
          credentialSubject: {
            visa: elem,
          },
        },
      };
      const vcVisaJwtElem = createVerifiableCredentialJwt(
        vcVisaPayload,
        issuer
      );
      return vcVisaJwtElem;
    });
    const vcVisaJwt = await Promise.all(visaPromises);

    res.status(200).send({
      data: { vcPassJwt: vcPassJwt, vcVisaJwt: vcVisaJwt },
      msg: "get passport information success",
    });
  }
};

export const requestVisa = async (req: Request, res: Response) => {
  const { visa_purpose, target_country } = req.body;
  // JWT token from authorization header
  const authorization = req.headers["authorization"];
  // specify user using user data in DB
  const clientInfo: any = await new Promise((resolve) => {
    resolve(clientAuth(authorization));
  });
  if (clientInfo.name == "JsonWebTokenError") {
    return res.status(400).send({ data: null, msg: "invaild token" });
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
    country_code: target_country,
  };
  // check requested visa is available
  const visaType: any = await new Promise((resolve) => {
    query.getUserMultiCond(
      "GOVERN_FA_VISA",
      condOption,
      (err: any, data: any) => {
        if (data.length === 0) {
          return res.status(400).send({
            data: null,
            msg: "No available visa for your request",
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

export const getAvailableVisa = async (req: Request, res: Response) => {
  // specify user using user data in DB
  await query.getAllData("GOVERN_FA_VISA", (err: any, data: any) => {
    if (err) {
      console.log("ERROR : ", err);
    } else {
      if (data.length === 0) {
        return res.status(400).send({ data: null, msg: "no data matched" });
      } else {
        let countryList: any = [];
        let purposeList: any = [];
        data.forEach((elem: any, idx: number) => {
          countryList.push(elem.country_code);
          purposeList.push(elem.visa_purpose);
        });
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
