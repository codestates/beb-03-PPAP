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
    // JWT token from authorization header
    const authorization = req.headers['authorization'];
    // specify user using user data in DB
    const clientInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });
    // add user photo data
    clientInfo.photoURI = photoURI;

    // submit request for issuing passport
    await query.requestForm(clientInfo, (err: any, data: any) => {
        let statusCode: number = 401;
        let msg: string;
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        if (!data) {
            // already exist request
            statusCode = 401;
            msg = 'Your request is already transfered';
        } else {
            // no request -> submit new request to DB
            statusCode = 200;
            msg = 'Your request is sucessfully submitted';
        }
        res.status(statusCode).send({
            data: null,
            msg: msg,
        });
    });
};

export const getPassport = async (req: Request, res: Response) => {
    // JWT token from authorization header
    const authorization = req.headers['authorization'];
    // specify user using user data in DB
    const clientInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });
    query.getUser(
        'GOVERN_FA_PASSPORT',
        'did',
        clientInfo.did,
        (err: any, data: any) => {
            let msg: any = null;
            let statusCode: any = null;
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            if (!data) {
                // no data in passport DB
                msg = `You don't have passport yet. Submit passport request first.`;
                statusCode = 401;
            }
            if (data[0].successyn === 0) {
                // submitted request is not approved yet
                msg = 'your request is not approved yet.';
                statusCode = 401;
            } else if (data[0].successyn === 2) {
                // submitted request is not approved yet
                msg = 'your request is rejected';
                statusCode = 401;
            } else if (data[0].successyn === 1) {
                statusCode = 200;
                msg = 'identify success';
            }
            // **** data should be transferred by session ****
            // res.status(statusCode).send({
            //     data: null,
            //     msg: msg,
            // });
        }
    );
};

export const requestVisa = async (req: Request, res: Response) => {
    const { visaType } = req.body;
    // JWT token from authorization header
    const authorization = req.headers['authorization'];
    // specify user using user data in DB
    const clientInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });
};

// export const test = async (req: Request, res: Response) => {
//     return new Promise((resolve) => {
//         query.joinTables((req: any, res: any) => {
//             console.log(res);
//         });
//     });
// };
