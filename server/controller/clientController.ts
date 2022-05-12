const query = require('../mysql/query/query');
import { rejects } from 'assert';
import { Request, Response, NextFunction } from 'express';

import { auth } from '../functions/auth';

const clientAuth = async (authorization: any) => {
    let output: any = await auth(authorization);
    // .then으로 resolve, reject 경우 나눠서 처리
    return output;
};

export const requestPassport = async (req: Request, res: Response) => {
    const { photoURI } = req.body;
    const authorization = req.headers['authorization'];
    // const clientInfo = clientAuth(authorization);
    const clientInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });
    clientInfo.photoURI = photoURI;

    await query.requestForm(clientInfo, (reqIn: Request, resIn: Response) => {
        if (!resIn) {
            res.status(401).send({
                data: null,
                msg: 'Your request is already transfered',
            });
        } else {
            res.status(200).send({
                data: null,
                msg: 'Your request is successfully submitted',
            });
        }
    });
};

export const getPassport = async (req: Request, res: Response) => {
    const authorization = req.headers['authorization'];
    const clientInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });
    console.log(clientInfo);
    res.status(200).send();
};

export const requestVisa = async (req: Request, res: Response) => {
    const { test } = req.body;
    const msg = `test post method requestVisa : ${test}`;
    console.log(msg);
    res.send({ msg: msg });
};

export const test = async (req: Request, res: Response) => {
    return new Promise((resolve) => {
        query.joinTables((req: Request, res: Response) => {
            console.log(res);
        });
    });
};
