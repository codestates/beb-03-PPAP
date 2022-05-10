import { Request, Response, NextFunction } from "express";
import { auth } from "../functions/auth";
import { clientUserInfo } from "../userInfo/clientUserInfo";
const clientAuth = async (authorization: any) => {
  let output = await auth(authorization);
  console.log("==========", clientUserInfo.personalId);
};
export const getPassport = async (req: Request, res: Response) => {
  const authorization = req.headers["authorization"];
  res.status(200).send(clientAuth(authorization));
};
export const requestPassport = async (req: Request, res: Response) => {
  const { test } = req.body;
  const msg = `test post method requestPassport : ${test}`;
  console.log(msg);
  res.send({ msg: msg });
};

export const requestVisa = async (req: Request, res: Response) => {
  const { test } = req.body;
  const msg = `test post method requestVisa : ${test}`;
  console.log(msg);
  res.send({ msg: msg });
};
