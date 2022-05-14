import {
    requestPassport,
    requestVisa,
    getPassport,
} from '../controller/clientController';

import express from 'express';
const clientRoute = express.Router();

clientRoute.route('/reqPass').post(requestPassport);
clientRoute.route('/getPass').get(getPassport);
clientRoute.route('/reqVisa').post(requestVisa);

module.exports.clientRoute = clientRoute;
