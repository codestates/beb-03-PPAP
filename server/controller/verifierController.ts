import { EthrDID } from "ethr-did";
import { Issuer } from "did-jwt-vc";
import { Wallet } from "@ethersproject/wallet";
import { ethers } from "ethers";
import { Request, Response, NextFunction } from "express";
const { issuerPub, issuerPriv, didContractAdd } = require("../config");
const rpcUrl = "http://localhost:7545";
let provider = new ethers.providers.JsonRpcProvider(rpcUrl);
let contractAddress = didContractAdd; //local
// txSigner는 이슈어의 개인키? 가 아니고 트랜잭션 일으킬 주체
const txSigner = new Wallet(
  "79e5fe77b16cd3c7495fa1170adf4cf15b6a8cd545a42abea4cf0d6a17b90bfe",
  provider
); //해당 계정의 개인키

import {
  JwtCredentialPayload,
  createVerifiableCredentialJwt,
  JwtPresentationPayload,
  createVerifiablePresentationJwt,
  verifyCredential,
} from "did-jwt-vc";
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";

export const verifyPassport = async (req: Request, res: Response) => {
  try {
    // 요청 : vp토큰
    // 응답 : success, fail

    const { vcJWT } = req.body; // 바디?? 헤더??
    const issuer = new EthrDID({
      txSigner,
      provider,
      identifier: issuerPub,
      privateKey: issuerPriv,
      rpcUrl,
      chainNameOrId: "ganache",
      registry: contractAddress,
    }) as Issuer;
    console.log("Issuer::" + issuer.did);
    const vcPayload: JwtCredentialPayload = {
      sub: issuer.did,
      nbf: 1562950282,
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential"],
        credentialSubject: {
          degree: {
            type: "BachelorDegree",
            name: "Baccalauréat en musiques numériques",
          },
          abc: {
            type: "abc",
            name: "def",
          },
        },
      },
    };
    const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer);
    console.log("VCJWT::" + vcJwt);

    // const vpPayload: JwtPresentationPayload = {
    //   vp: {
    //     "@context": ["https://www.w3.org/2018/credentials/v1"],
    //     type: ["VerifiablePresentation"],
    //     verifiableCredential: [vcJwt],
    //   },
    // };

    // const vpJWT = await createVerifiablePresentationJwt(vpPayload, issuer);
    // console.log("VPJWT::" + vpJWT);

    // const msg = `test post method verifyPassport : ${vpJWT}`;
    // console.log(msg,"ㅇㅇ");
    const providerConfig = {
      name: "ganache",
      rpcUrl: "http://localhost:7545",
      registry: contractAddress,
    };
    const ethrDidResolver = getResolver(providerConfig);
    const didResolver = new Resolver(ethrDidResolver);
    const verifiedVC = await verifyCredential(vcJwt, didResolver);
    // console.log(verifiedVC.payload.iss);
    res.status(200).send({ msg: verifiedVC });
  } catch (e) {
    console.log(e);
  }
};
