const query = require("../mysql/query/query");
import { Request, Response, NextFunction } from "express";
import {
  JwtCredentialPayload,
  createVerifiableCredentialJwt,
} from "did-jwt-vc";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
import { getOnlyPassport } from "../functions/holder";
import { auth } from "../functions/auth";
import createIssuerDID from "../functions/createIssuerDID";
const didContractAdd = "0x87BDF06D9c66421Af59167c9DA71E08eB4F09Dca";

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
    console.log(data);
    if (!data) {
      return res.status(400).send({
        data: null,
        msg: `You already have passport VC.`,
      });
    }

    if (data.insertId) {
      // no request -> submit new request to DB
      query.getTargetData(
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
          msg: "Your request is already transfered and not approved",
        });
      } else if (data.success_yn === "1") {
        // already exist passport
        res.status(401).send({
          data: null,
          msg: "You already have passport. Get your passport.",
        });
      } else if (data.success_yn === "2") {
        // rejected passport
        res.status(401).send({
          data: null,
          msg: "Your request is rejected.",
        });
      }
    }
  });
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
    return res.status(400).send({ data: null, msg: "invaild token" });
  }

  // recall passport
  const passData = await getOnlyPassport(holderInfo);
  if (passData.statusCode) {
    return res
      .status(passData.statusCode)
      .send({ data: null, msg: passData.msg });
  }
  // add photo on passport into holderInfo object
  holderInfo.photo_uri = passData.data[0].photo_uri;

  // specify owner of passport to get visa, stamp list
  const passId = passData.data[0].passport_id;
  // get visa list

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
        passportInfo: holderInfo,
      },
    },
  };
  // create vc as JWT token under issuer signing
  console.log(issuer);
  const vcPassJwt = await createVerifiableCredentialJwt(vcPassPayload, issuer);

  res.status(200).send({
    data: { vcPassJwt: vcPassJwt },
    msg: "get passport information success",
  });
};

export const requestVisa = async (req: Request, res: Response) => {
  const { visa_purpose, target_country, vcPassJwt } = req.body;

  // JWT token from authorization header
  const authorization = req.headers["authorization"];
  // specify user using user data in DB
  const holderInfo: any = await new Promise((resolve) => {
    resolve(clientAuth(authorization));
  });
  // case when token is not valid
  if (holderInfo.name == "JsonWebTokenError") {
    return res.status(400).send({ data: null, msg: "invaild token" });
  }

  const issuer: any = await createIssuerDID();
  const providerConfig = {
    name: "ganache",
    rpcUrl: "http://localhost:7545",
    registry: didContractAdd,
  };
  const ethrDidResolver = getResolver(providerConfig);
  const didResolver = new Resolver(ethrDidResolver);
  // const verifiedVP = await verifyPresentation(vpJWT, didResolver);

  // // recall passport
  // const passData = await getOnlyPassport(holderInfo);
  // if (passData.statusCode) {
  //     return res
  //         .status(passData.statusCode)
  //         .send({ data: null, msg: passData.msg });
  // }
  // // specify owner of passport
  // holderInfo.passport_id = passData.data[0].passport_id;

  // // option to find visa type
  // const condOption = {
  //     visa_purpose: visa_purpose,
  //     country_code: target_country,
  // };
  // // get visa type under pre-setted option
  // const visaType: any = await new Promise((resolve) => {
  //     query.getMultiCondData(
  //         'GOVERN_FA_VISA',
  //         condOption,
  //         (err: any, data: any) => {
  //             // requested visa doesn't exist
  //             if (data.length === 0) {
  //                 return res.status(400).send({
  //                     data: null,
  //                     msg: 'No available visa for your request',
  //                 });
  //             }
  //             resolve(data);
  //         }
  //     );
  // });
  // // specify requested visa type
  // holderInfo.visa_id = visaType[0].visa_id;

  // // submit request for issuing visa
  // await query.requestVisaForm(holderInfo, (err: any, data: any) => {
  //     if (err) {
  //         console.log('ERROR : ', err);
  //         res.status(400).send(err);
  //     }
  //     if (data.insertId) {
  //         const condOption = {
  //             passport_id: holderInfo.passport_id,
  //             visa_id: holderInfo.visa_id,
  //         };
  //         // no request -> submit new request to DB
  //         query.getMultiCondData(
  //             'GOVERN_FA_VISA_SURVEY',
  //             condOption,
  //             (err: any, data: any) => {
  //                 res.status(200).send({
  //                     requestedData: data[0],
  //                     msg: 'Your request is sucessfully submitted',
  //                 });
  //             }
  //         );
  //     } else {
  //         // already exist request
  //         res.status(401).send({
  //             data: null,
  //             msg: 'Your request is already transfered',
  //         });
  //     }
  // });
};

export const getAvailableVisa = async (req: Request, res: Response) => {
  // specify user using user data in DB
  await query.getAllData("GOVERN_FA_VISA", (err: any, data: any) => {
    if (err) {
      console.log("ERROR : ", err);
    } else {
      if (data.length === 0) {
        // case when available visa is empty
        return res.status(400).send({ data: null, msg: "no data matched" });
      } else {
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

// const visaList: any = await new Promise((resolve) => {
//     query.getTargetData(
//         'GOVERN_FA_VISA_SURVEY',
//         'passport_id',
//         passId,
//         (err: any, data: any) => {
//             if (err) {
//                 console.log('ERROR : ', err);
//                 return err;
//             } else {
//                 resolve(data);
//             }
//         }
//     );
// });

// // get stamp list
// const stampList = await new Promise((resolve) => {
//     query.getTargetData(
//         'GOVERN_FA_STAMP',
//         'passport_id',
//         passId,
//         (err: any, data: any) => {
//             if (err) {
//                 console.log('ERROR : ', err);
//                 return err;
//             } else {
//                 resolve(data);
//             }
//         }
//     );
// });

// // vc payload which contains visa -> to deal multiple visa
// const visaPromises = await visaList.map((elem: any, idx: number) => {
//     const vcVisaPayload: JwtCredentialPayload = {
//         sub: holderInfo.did,
//         nbf: 1562950282,
//         vc: {
//             '@context': ['https://www.w3.org/2018/credentials/v1'],
//             type: ['VerifiableCredential'],
//             credentialSubject: {
//                 visa: elem,
//             },
//         },
//     };
//     const vcVisaJwtElem = createVerifiableCredentialJwt(
//         vcVisaPayload,
//         issuer
//     );
//     return vcVisaJwtElem;
// });
// // deal multiple promise element
// const vcVisaJwt = await Promise.all(visaPromises);

export const test = async (req: Request, res: Response) => {};
// const vpPayload: JwtPresentationPayload = {
//   vp: {
//     "@context": ["https://www.w3.org/2018/credentials/v1"],
//     type: ["VerifiablePresentation"],
//     verifiableCredential: [vcJwt],
//   },
// };
