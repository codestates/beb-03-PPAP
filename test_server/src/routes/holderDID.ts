import express, { Request, Response, NextFunction } from "express";
var router = express.Router();
import { EthrDID } from "ethr-did";
import { Issuer } from "did-jwt-vc";
import { Wallet } from "@ethersproject/wallet";
import { ethers } from "ethers";
const { issuerPub, issuerPriv, didContractAdd } = require("../config");
const rpcUrl = process.env.RPC_URL;
var provider = new ethers.providers.JsonRpcProvider(rpcUrl);
var contractAddress = didContractAdd; //local
const txSigner = new Wallet(issuerPriv, provider);

/* example page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  const startGanacheServerAndDeployEthrDidRegistry = async () => {
    const issuer = new EthrDID({
      txSigner,
      provider,
      identifier: issuerPub,
      privateKey: issuerPriv,
      rpcUrl,
      chainNameOrId: "ganache",
      registry: contractAddress,
    }) as Issuer;
    console.log("Issuer::");
    console.log(issuer.did);

    const holder = new EthrDID({
      txSigner,
      provider,
      identifier: "0x2D6A3F0cE64A7c9F43Da9b28253CA56d192f821e",
      privateKey:
        "79e5fe77b16cd3c7495fa1170adf4cf15b6a8cd545a42abea4cf0d6a17b90bfe",
      rpcUrl,
      chainNameOrId: "ganache",
      registry: contractAddress,
    });
    console.log("Holder::" + holder.did);

    res.status(200).send({ message: holder.did });
  };
  startGanacheServerAndDeployEthrDidRegistry();
});

export default router;
