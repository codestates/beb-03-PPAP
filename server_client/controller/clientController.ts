import { Request, Response } from "express";
const query = require("../mysql/query/query");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
import { EthrDID } from "ethr-did";
import { ethers } from "ethers";
// const { issuerPub, issuerPriv, didContractAdd } = require('../config');

const didContractAdd = "0x87BDF06D9c66421Af59167c9DA71E08eB4F09Dca";
const rpcUrl = "http://localhost:7545";
var provider = new ethers.providers.JsonRpcProvider(rpcUrl);
var contractAddress = didContractAdd; //local

const passHash = async (pass: String) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPass = await bcrypt.hash(pass, salt);
  return hashedPass;
};

const genAccessToken = (data: any) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export const register = async (req: Request, res: Response) => {
  const userData = req.body;

  const keypair = EthrDID.createKeyPair();
  const holder = new EthrDID({
    provider,
    identifier: keypair.identifier,
    privateKey: keypair.privateKey,
    rpcUrl,
    chainNameOrId: "ganache",
    registry: contractAddress,
  });
  userData.did = holder.did;

  const hashed = passHash(userData.password);
  userData.password = hashed;

  await query.createUser(userData, (err: any, data: any) => {
    if (err) {
      // error handling code goes here
      console.log("ERROR : ", err);
    } else {
      if (data) {
        res.send({
          data: null,
          msg: "Your data successfully registered!",
        });
      } else {
        res.send({ data: null, msg: "Your data already exists!" });
      }
    }
  });
};

export const login = async (req: Request, res: Response) => {
  const loginData = req.body;

  await query.getUser(
    "user_name",
    loginData.userName,
    async (err: any, data: any) => {
      if (err) {
        // error handling code goes here
        console.log("ERROR : ", err);
      } else {
        if (data.length === 0) {
          res.send({
            data: null,
            msg: "Wrong username or no data exists!",
          });
        } else {
          let singleData: any = null;
          for (const elem of data) {
            const compare = await bcrypt.compare(
              loginData.password,
              elem.password
            );
            if (compare) {
              singleData = elem;
            }
          }
          if (!singleData) {
            res.send({ data: null, msg: "Wrong password!" });
          } else {
            const tokenData = {
              did: singleData.did,
              phoneNum: singleData.phoneNum,
            };

            const accessToken = genAccessToken(tokenData);
            res.send({ data: accessToken, msg: "Login success!" });
          }
        }
      }
    }
  );
};

export const test = async (req: Request, res: Response) => {
  res.send({ msg: "For test!" });
};

// module.exports = { register, authClient };

// const dataFiltered = await data.filter(
//     async (elem: any) =>
//         await bcrypt.compare(
//             loginData.password,
//             elem.password
//         )
// );
// console.log(dataFiltered);
