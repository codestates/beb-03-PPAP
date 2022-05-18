// import { authClient } from '../controller/authController.js';
// import express from "express";

const { register, login } = require('../controller/clientController.ts');
const express = require('express');
const clientRoute = express.Router();

clientRoute.route('/login').post(login);
clientRoute.route('/register').post(register);

module.exports.clientRoute = clientRoute;
