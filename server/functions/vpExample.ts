import { Issuer } from "did-jwt-vc";
import {
  JwtCredentialPayload,
  createVerifiableCredentialJwt,
  JwtPresentationPayload,
  createVerifiablePresentationJwt,
  verifyCredential,
} from "did-jwt-vc";
import { ethers } from "ethers";
import { Wallet } from "@ethersproject/wallet";
import { EthrDID } from "ethr-did";
const rpcUrl = process.env.RPC_URL;
var provider = new ethers.providers.JsonRpcProvider(rpcUrl);
var contractAddress = "0x4C9B4DaCb456861dD165b1b4F02D3e1aDb5650F8"; //local
const txSigner = new Wallet(
  "0bc990bb98af9946054526722c2f235230bf0f32e4cfac2fb1cd2df3cb37fd75",
  provider
); //해당 계정의 개인키

const startGanacheServerAndDeployEthrDidRegistry = async () => {
  const issuer = new EthrDID({
    txSigner,
    provider,
    identifier: "0x5efEAaE782DD1c16e2db4618904eD396066a0F06",
    privateKey:
      "0bc990bb98af9946054526722c2f235230bf0f32e4cfac2fb1cd2df3cb37fd75",
    rpcUrl,
    chainNameOrId: "ganache",
    registry: contractAddress,
  }) as Issuer;
  console.log("Issuer::" + issuer.did);
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
  console.log(holder.did);

  // const vcPayload: JwtCredentialPayload = {
  //   sub: "did:ethr:ganache:0x02d9417057f1a9aa8307a887fc5bb1499666de3e10c6affd7eb9f5f6698a36f737",
  //   nbf: 1562950282,
  //   vc: {
  //     "@context": ["https://www.w3.org/2018/credentials/v1"],
  //     type: ["VerifiableCredential"],
  //     credentialSubject: {
  //       // GOVERN_FA_PASSPORT Inner join GOVERN_USER_CLIENT
  //       passport: {
  //         passport_id,
  //         client_id,
  //         did,
  //         photo_uri,
  //         creation_date,
  //         modified_date,
  //         user_name,
  //         country_code,
  //         age,
  //         sex,
  //         birth,
  //         phone_num,
  //         personal_id,
  //       },
  //       // GOVERN_FA_VISA Inner Join GOVERN_FA_VISA_SURVEY
  //       // 두개가 따로오게? 같이오게?
  //       visa: {
  //         visa_survey_id,
  //         passport_id,
  //         visa_id,
  //         creation_date,
  //         modified_date,
  //         visa_name,
  //         visa_purpose,
  //         country_code,
  //         visa_expired_date,
  //       },
  //     },
  //   },
  // };

  // const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer);
  // console.log("VCJWT::" + vcJwt);

  // const vpPayload: JwtPresentationPayload = {
  //   vp: {
  //     "@context": ["https://www.w3.org/2018/credentials/v1"],
  //     type: ["VerifiablePresentation"],
  //     verifiableCredential: [vcJwt],
  //   },
  // };

  // const vpJwt = await createVerifiablePresentationJwt(vpPayload, issuer);
  // console.log("VPJWT::" + vpJwt);
};
startGanacheServerAndDeployEthrDidRegistry();
