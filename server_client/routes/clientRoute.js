// import { authClient } from '../controller/authController.js';
// import express from "express";

const { register, login, test } = require('../controller/clientController.ts');
const express = require('express');
const clientRoute = express.Router();

clientRoute.route('/login').post(login);
clientRoute.route('/register').post(register);
clientRoute.route('/test').post(test);

module.exports.clientRoute = clientRoute;
