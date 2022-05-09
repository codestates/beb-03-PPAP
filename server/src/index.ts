// import dotenv from "dotenv";
// import express from "express";
const dotenv = require("dotenv");
const express = require("express");
// import cors from "cors";
// import { authRoute } from "../routes/authRoute";
// import { issuerRoute } from "../routes/issuerRoute";
// import { verifierRoute } from "../routes/verifierRoute.js";
const cors = require("cors");
const { issuerRoute } = require("../routes/issuerRoute");
const { verifierRoute } = require("../routes/verifierRoute");

const app = express();

dotenv.config({ path: "./.env" });

const port = 4000;

const corsOptions = {
  origin: [
    `http://localhost:${port}`,
    "http://localhost:3000",
    "exp://q6-xk2.ressom.holder-client.exp.direct:80",
  ],
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // FIX ME: {extended: false}

app.use("/issuer", issuerRoute);
app.use("/verifier", verifierRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
