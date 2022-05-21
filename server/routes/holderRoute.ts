import {
    requestPassport,
    requestVisa,
    issuePassVC,
    // issueVisaVC,
    // issueStampVC,
    getAvailableVisa,
    test,
} from '../controller/holderController';

import express from 'express';
const holderRoute = express.Router();

holderRoute.route('/reqPass').post(requestPassport);
holderRoute.route('/reqVisa').post(requestVisa);
holderRoute.route('/issuePassVC').get(issuePassVC);
// holderRoute.route('/issueVisaVC').get(issueVisaVC);
// holderRoute.route('/issueStampVC').get(issueStampVC);
holderRoute.route('/getAvailVisa').get(getAvailableVisa);
holderRoute.route('/test').get(test);

module.exports.holderRoute = holderRoute;
