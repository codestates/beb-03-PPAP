const { issuerPub, issuerPriv, didContractAdd } = require("../config");
import { ethers } from "ethers";
import { Issuer } from "did-jwt-vc";
import { EthrDID } from "ethr-did";
import { Wallet } from "@ethersproject/wallet";

const rpcUrl = "http://192.168.35.214:7545";
var provider = new ethers.providers.JsonRpcProvider(rpcUrl);

const txSigner = new Wallet(issuerPriv, provider);
const createIssuerDID = async () => {
  try {
    const rpcUrl = "http://192.168.35.214:7545";
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
