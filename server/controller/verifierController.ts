import { EthrDID } from "ethr-did";
import { Issuer } from "did-jwt-vc";
import { Wallet } from "@ethersproject/wallet";
import { ethers } from "ethers";
import express, { Request, Response, NextFunction } from "express";
const { issuerPub, issuerPriv, didContractAdd } = require("../config");
const rpcUrl = "http://localhost:7545";
var provider = new ethers.providers.JsonRpcProvider(rpcUrl);
var contractAddress = "0x8B299ea59ef193F8e2c3A574fbF834010990741B"; //local
// txSigner는 이슈어의 개인키? 가 아니고 트랜잭션 일으킬 주체
const txSigner = new Wallet(
  "d79cf95b1518009781aaf9f28724b9ee4eef31efe1edb4a17849487696a7131c",
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
  // 요청 : vp토큰
  // 응답 : success, fail
  const { vpJWT } = req.body; // 바디?? 헤더??

  const msg = `test post method verifyPassport : ${vpJWT}`;
  console.log(msg);
  res.send({ msg: msg });
};

// export const verifyVisa = async (req:Request, res:Response) => {
//   const { test } = req.body;
//   const msg = `test post method verifyVisa : ${test}`;
//   console.log(msg);
//   res.send({ msg: msg });
// };

// export const mintStampNFT = async (req:Request, res:Response) => {
//   const { test } = req.body;
//   const msg = `test post method mintStampNFT : ${test}`;
//   console.log(msg);
//   res.send({ msg: msg });
// };
