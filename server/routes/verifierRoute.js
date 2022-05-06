import {
    verifyPassport,
    verifyVisa,
    mintStampNFT,
} from '../controller/verifierController.js';

import express from 'express';

const verifierRoute = express.Router();

verifierRoute.route('/veriPass').post(verifyPassport);
verifierRoute.route('/veriVisa').post(verifyVisa);
verifierRoute.route('/mintStamp').post(mintStampNFT);

export default verifierRoute;
