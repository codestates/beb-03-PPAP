const { issuerPub, issuerPriv, didContractAdd } = require("../config");
import { ethers } from "ethers";
import { Issuer } from "did-jwt-vc";
import { EthrDID } from "ethr-did";
import { Wallet } from "@ethersproject/wallet";

const rpcUrl = process.env.RPC_URL;
var provider = new ethers.providers.JsonRpcProvider(rpcUrl);

const txSigner = new Wallet(issuerPriv, provider);
const createIssuerDID = async () => {
  try {
    const rpcUrl = process.env.RPC_URL;
    const issuer = new EthrDID({
      txSigner,
      provider,
      identifier: issuerPub,
      privateKey: issuerPriv,
      rpcUrl,
      chainNameOrId: "ganache",
      registry: didContractAdd,
    }) as Issuer;

    console.log(issuer.did);
    return issuer;
  } catch (e) {
    console.log(e);
  }
};
export default createIssuerDID;
