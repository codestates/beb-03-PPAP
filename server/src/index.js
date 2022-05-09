"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// import cors from "cors";
// import { authRoute } from "../routes/authRoute";
// import { issuerRoute } from "../routes/issuerRoute";
// import { verifierRoute } from "../routes/verifierRoute.js";
const cors = require("cors");
const authRoute = require("../routes/authRoute.js");
const issuerRoute = require("../routes/issuerRoute.js");
const verifierRoute = require("../routes/verifierRoute.js");
const app = (0, express_1.default)();
dotenv_1.default.config({ path: "./.env" });
const port = 4000;
const corsOptions = { origin: `http://localhost:${port}` };
app.use(cors(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", authRoute);
app.use("/issuer", issuerRoute);
app.use("/verifier", verifierRoute);
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});
