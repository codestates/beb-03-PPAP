import {
    requestPassport,
    requestVisa,
    getPassport,
    getAvailableVisa,
} from '../controller/clientController';

import express from 'express';
const clientRoute = express.Router();

clientRoute.route('/reqPass').post(requestPassport);
clientRoute.route('/reqVisa').post(requestVisa);
clientRoute.route('/getPass').get(getPassport);
clientRoute.route('/getAvailVisa').get(getAvailableVisa);

module.exports.clientRoute = clientRoute;
