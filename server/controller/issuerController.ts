import { Request, Response, NextFunction } from "express";
export const getPassport = async (req: Request, res: Response) => {
  const msg = `test get method getPassport`;
  console.log(msg);
  res.send({ msg: msg });
};

export const authPassport = async (req: Request, res: Response) => {
  const msg = `test get method authPassport`;
  console.log(msg);
  res.send({ msg: msg });
};

export const requestPassport = async (req: Request, res: Response) => {
  const { test } = req.body;
  const msg = `test post method requestPassport : ${test}`;
  console.log(msg);
  res.send({ msg: msg });
};

export const makePassport = async (req: Request, res: Response) => {
  const { test } = req.body;
  const msg = `test post method makePassport : ${test}`;
  console.log(msg);
  res.send({ msg: msg });
};

export const requestVisa = async (req: Request, res: Response) => {
  const { test } = req.body;
  const msg = `test post method requestVisa : ${test}`;
  console.log(msg);
  res.send({ msg: msg });
};

export const makeVisa = async (req: Request, res: Response) => {
  const { test } = req.body;
  const msg = `test post method makeVisa : ${test}`;
  console.log(msg);
  res.send({ msg: msg });
};

// exports.getPassport = getPassport;
// exports.authPassport = authPassport;
// exports.requestPassport = requestPassport;
// exports.makePassport = makePassport;
// exports.requestVisa = requestVisa;
// exports.makeVisa = makeVisa;

// module.exports = {
//   getPassport,
//   authPassport,
//   requestPassport,
//   makePassport,
//   requestVisa,
//   makeVisa,
// };
