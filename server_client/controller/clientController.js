"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.login = exports.register = void 0;
const models = require('../models');
const jwt = require('jsonwebtoken');
const ethr_did_1 = require("ethr-did");
const wallet_1 = require("@ethersproject/wallet");
const ethers_1 = require("ethers");
const { getClientUser } = require('../mysql/query/query.js');
// const { issuerPub, issuerPriv, didContractAdd } = require('../config');
const issuerPriv = 'b315603e5af5e4e519f3804e97355dfdbcdbbf209f619a3c7a817e2e02df0449';
const didContractAdd = '0x87BDF06D9c66421Af59167c9DA71E08eB4F09Dca';
const rpcUrl = 'http://localhost:7545';
var provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
var contractAddress = didContractAdd; //local
const txSigner = new wallet_1.Wallet(issuerPriv, provider);
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authentication'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        // req.user = user;
        next();
    });
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const holder = new ethr_did_1.EthrDID({
        txSigner,
        provider,
        identifier: '0x2D6A3F0cE64A7c9F43Da9b28253CA56d192f821e',
        privateKey: '79e5fe77b16cd3c7495fa1170adf4cf15b6a8cd545a42abea4cf0d6a17b90bfe',
        rpcUrl,
        chainNameOrId: 'ganache',
        registry: contractAddress,
    });
    console.log('Holder::' + holder.did);
    const msg = `Your data is successfully registered!`;
    res.send({ msg: msg });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { test } = req.body;
    const msg = `test post method authClient : ${test}`;
    console.log(msg);
    res.send({ msg: msg });
});
exports.login = login;
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(getClientUser());
});
exports.test = test;
// module.exports = { register, authClient };
