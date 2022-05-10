// import dotenv from "dotenv";
import express from 'express';
// const express = require('express');
// const connection = require('./mysql/config/mysql');
// const query = require('./mysql/query/query');
// import cors from "cors";
// import { authRoute } from "../routes/authRoute";
// import { issuerRoute } from "../routes/issuerRoute";
// import { verifierRoute } from "../routes/verifierRoute.js";
const cors = require('cors');
const { clientRoute } = require('./routes/clientRoute.js');

const app = express();

const port = 4001;

const corsOptions = { origin: `http://localhost:${port}` };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', clientRoute);

app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});
