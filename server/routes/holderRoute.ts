import {
    requestPassport,
    requestVisa,
    getPassport,
    getAvailableVisa,
} from '../controller/holderController';

import express from 'express';
const holderRoute = express.Router();

holderRoute.route('/reqPass').post(requestPassport);
holderRoute.route('/reqVisa').post(requestVisa);
holderRoute.route('/getPass').get(getPassport);
holderRoute.route('/getAvailVisa').get(getAvailableVisa);

module.exports.holderRoute = holderRoute;
