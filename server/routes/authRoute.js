import { authClient } from '../controller/authController.js';

import express from 'express';
const authRoute = express.Router();
authRoute.route('/authClient').post(authClient);

export default authRoute;
