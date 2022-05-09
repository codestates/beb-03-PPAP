// import dotenv from "dotenv";
// import express from "express";
const dotenv = require("dotenv");
const express = require("express");
// import cors from "cors";
// import { authRoute } from "../routes/authRoute";
// import { issuerRoute } from "../routes/issuerRoute";
// import { verifierRoute } from "../routes/verifierRoute.js";
const cors = require("cors");
const { authRoute } = require("../routes/authRoute.js");
const { issuerRoute } = require("../routes/issuerRoute.js");
const { verifierRoute } = require("../routes/verifierRoute.js");

const app = express();

dotenv.config({ path: "./.env" });

const port = 4000;

const corsOptions = { origin: `http://localhost:${port}` };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);
app.use("/issuer", issuerRoute);
app.use("/verifier", verifierRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
