import { Request, Response, NextFunction } from "express";
import { auth } from "../functions/auth";

const clientAuth = async (authorization: any) => {
  let output: any = await auth(authorization);
  // .then으로 resolve, reject 경우 나눠서 처리
  console.log(output.personalId);
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
