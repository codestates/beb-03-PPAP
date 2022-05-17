// import { authClient } from '../controller/authController.js';
// import express from "express";

const {
    register,
    login,
    getUserInfo,
} = require('../controller/clientController.ts');
const express = require('express');
const clientRoute = express.Router();

clientRoute.route('/login').post(login);
clientRoute.route('/register').post(register);
clientRoute.route('/getUserInfo').get(getUserInfo);

module.exports.clientRoute = clientRoute;
