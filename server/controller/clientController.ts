const query = require('../mysql/query/query');
import { rejects } from 'assert';
import { Request, Response, NextFunction } from 'express';
import { getOnlyPassport } from '../functions/client';

import { auth } from '../functions/auth';

const clientAuth = async (authorization: any) => {
    let output: any = await auth(authorization);
    // .then으로 resolve, reject 경우 나눠서 처리
    return output;
};

export const requestPassport = async (req: Request, res: Response) => {
    const { photoURI } = req.body;
    // JWT token from authorization header
    const authorization = req.headers['authorization'];
    // specify user using user data in DB
    const clientInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });
    // add user photo data
    clientInfo.photoURI = photoURI;

    // submit request for issuing passport
    await query.requestPassForm(clientInfo, (err: any, data: any) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        if (!data) {
            // already exist request
            res.status(401).send({
                data: null,
                msg: 'Your request is already transfered',
            });
        } else {
            // no request -> submit new request to DB
            res.status(200).send({
                data: null,
                msg: 'Your request is sucessfully submitted',
            });
        }
    });
};

export const getPassport = async (req: Request, res: Response) => {
    // JWT token from authorization header
    const authorization = req.headers['authorization'];
    // specify user using user data in DB
    const clientInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });

    // recall passport
    const passData = await getOnlyPassport(clientInfo);
    if (passData.statusCode) {
        res.status(passData.statusCode).send({ data: null, msg: passData.msg });
    }

    // **** data should be transferred by session ****
    // **** visa, stamp data should be added ****
    // **** data should be transferred by session ****
};

export const requestVisa = async (req: Request, res: Response) => {
    const { visaPurpose } = req.body;
    // JWT token from authorization header
    const authorization = req.headers['authorization'];
    // specify user using user data in DB
    const clientInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });

    // recall passport
    const passData = await getOnlyPassport(clientInfo);
    if (passData.statusCode) {
        res.status(passData.statusCode).send({ data: null, msg: passData.msg });
    }
    clientInfo.passport_id = passData.data[0].passport_id;

    // find visa type
    const condOption = {
        visa_purpose: visaPurpose,
        countryCode: clientInfo.countryCode,
    };
    // check requested visa is available
    const visaType: any = await new Promise((resolve) => {
        query.getUserMultiCond(
            'GOVERN_FA_VISA',
            condOption,
            (err: any, data: any) => {
                if (!data) {
                    res.status(400).send({
                        data: null,
                        msg: 'No available for your request',
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
                msg: 'Your request is already transfered',
            });
        } else {
            // no request -> submit new request to DB
            res.status(200).send({
                data: null,
                msg: 'Your request is sucessfully submitted',
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
