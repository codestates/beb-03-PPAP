// import dotenv from "dotenv";
// import express from "express";
const dotenv = require("dotenv");
const express = require("express");
// import cors from "cors";
// import { authRoute } from "../routes/authRoute";
// import { issuerRoute } from "../routes/issuerRoute";
// import { verifierRoute } from "../routes/verifierRoute.js";
const cors = require("cors");
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const { adminRoute } = require("./routes/adminRoute");
const { holderRoute } = require("./routes/holderRoute");
import createIssuerDID from "./functions/createIssuerDID";

const app = express();

dotenv.config({ path: "./.env" });

const port = 4000;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "exp://q6-xk2.ressom.holder-client.exp.direct:80",
  ],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
};
createIssuerDID();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//     session({
//         secret: 'asefwaefawerfewrg',
//         resave: false,
//         saveUninitialized: true,
//         store: new FileStore(),
//     })
// );

app.use("/admin", adminRoute);
app.use("/client", holderRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
