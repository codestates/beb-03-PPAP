import { Request, Response, NextFunction } from 'express';
const query = require('../mysql/query/query');
// import { query } from '../mysql/query';
// const models = require('../models');
const jwt = require('jsonwebtoken');
import { EthrDID } from 'ethr-did';
import { Issuer } from 'did-jwt-vc';
import { Wallet } from '@ethersproject/wallet';
import { ethers } from 'ethers';
const { getClientUser } = require('../mysql/query/query');
// const { issuerPub, issuerPriv, didContractAdd } = require('../config');

const issuerPriv =
    'b315603e5af5e4e519f3804e97355dfdbcdbbf209f619a3c7a817e2e02df0449';
const didContractAdd = '0x87BDF06D9c66421Af59167c9DA71E08eB4F09Dca';
const rpcUrl = 'http://localhost:7545';
var provider = new ethers.providers.JsonRpcProvider(rpcUrl);
var contractAddress = didContractAdd; //local
const txSigner = new Wallet(issuerPriv, provider);

const authentication = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authentication'];
    const token = authHeader && (authHeader as string).split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: any, user: any) => {
            if (err) {
                return res.sendStatus(403);
            }
            // req.user = user;
            next();
        }
    );
};

export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, birthDate, sex, phoneNum } = req.body;
    const fullName = `${firstName}_${lastName}`;
    // console.log(firstName, lastName, birthDate, sex, phoneNum);
    // models.User.create({ user_name: fullName }).then((res: any) => {
    //     // console.log(res);
    // });

    // models.User.findAll().then(console.log);

    // models.User.findOne({ where: { user_name: 'a_b' } }).then((res: any) => {
    //     console.log(res);
    // });

    // models.User.findOne({ where: { user_name: 'aa_bb' } }).then((user: any) => {
    //     if (user) {
    //         user.update({ user_name: 'cc_dd' });
    //     }
    // });

    // models.User.destroy({ where: { user_name: 'a_b' } });

    // models.User.findOrCreate({ where: { user_name: fullName } })
    //     .then()
    //     .catch((err: any) => {
    //         console.log(err);
    //     });

    const holder = new EthrDID({
        txSigner,
        provider,
        identifier: '0x2D6A3F0cE64A7c9F43Da9b28253CA56d192f821e',
        privateKey:
            '79e5fe77b16cd3c7495fa1170adf4cf15b6a8cd545a42abea4cf0d6a17b90bfe',
        rpcUrl,
        chainNameOrId: 'ganache',
        registry: contractAddress,
    });
    console.log('Holder::' + holder.did);

    const msg = `Your data is successfully registered!`;
    res.send({ msg: msg });
};

export const login = async (req: Request, res: Response) => {
    const { test } = req.body;
    const msg = `test post method authClient : ${test}`;
    console.log(msg);
    res.send({ msg: msg });
};

export const test = async (req: Request, res: Response) => {
    query.getClientUser((err: any, data: any) => {
        if (err) {
            // error handling code goes here
            console.log('ERROR : ', err);
        } else {
            // code to execute on data retrieval
            console.log('result from db is : ', data);
            res.send(data);
        }
    });
    // console.log(getClientUser());
};

// module.exports = { register, authClient };
