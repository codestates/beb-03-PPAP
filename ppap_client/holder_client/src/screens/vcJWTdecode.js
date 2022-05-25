"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGanacheServerAndDeployEthrDidRegistry = void 0;
const did_jwt_vc_1 = require("did-jwt-vc");
const ethers_1 = require("ethers");
const wallet_1 = require("@ethersproject/wallet");
const ethr_did_1 = require("ethr-did");
const rpcUrl = "http://localhost:7545";
var provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
var contractAddress = "0xE6B00E1FF42A875b5C1E903131Eec51a02E40cbB"; //local
const txSigner = new wallet_1.Wallet(
  "68136eeb0f18517f705d875e3d37899d228777dd1dd58da575093612156a263e",
  provider,
); //해당 계정의 개인키
// const vcJwt =
//   "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7InBhc3Nwb3J0SW5mbyI6eyJkaWQiOiJkaWQ6ZXRocjpnYW5hY2hlOjB4MDM2MTU2ZDY2YzNkNjhlOTg4OTg3YjM5YWNjYmEzOTg3MmRiNTAzOTUxNjVhZDM3ZTgzZjc1MmNiODNjYWFiNWI4IiwiY2xpZW50X2lkIjoxMSwiY291bnRyeV9jb2RlIjoiS09SIiwicGhvdG9fdXJpIjoiaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MjI3NjcxMzE1OTQtNmI3ZTk2ODQ4ZmJhP2l4bGliPXJiLTEuMi4xJml4aWQ9TW53eE1qQTNmREI4TUh4d2FHOTBieTF3WVdkbGZIeDhmR1Z1ZkRCOGZIeDgmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz03ODYmcT04MCJ9LCJ2aXNhTGlzdCI6W3sidmlzYV9zdXJ2ZXlfaWQiOjgsInBhc3Nwb3J0X2lkIjoyOCwidmlzYV9pZCI6IjIiLCJzdWNjZXNzX3luIjoiMSIsImNyZWF0aW9uX2RhdGUiOiIyMDIyLTA1LTE2VDAyOjM1OjEyLjAwMFoiLCJtb2RpZmllZF9kYXRhIjoiMjAyMi0wNS0xNlQwMjozNToxMi4wMDBaIn1dLCJzdGFtcExpc3QiOltdfX0sInN1YiI6ImRpZDpldGhyOmdhbmFjaGU6MHgwMzYxNTZkNjZjM2Q2OGU5ODg5ODdiMzlhY2NiYTM5ODcyZGI1MDM5NTE2NWFkMzdlODNmNzUyY2I4M2NhYWI1YjgiLCJuYmYiOjE1NjI5NTAyODIsImlzcyI6ImRpZDpldGhyOmdhbmFjaGU6MHg3Mzc2MjUyNzUzNTIzM0NEYUY5MDg1OEEyRDFDOTgyNDNhN0MzRTcxIn0.osVMUA3zyZ3UJGutCfV3VWV-42IRn2R7NPoyfAv-SyiqCMKkhEjWNdJBJ99qN4fLp2mmuyNQDuU0eQ3nBvee1wA";
//  holder did :  did:ethr:ganache:0x036156d66c3d68e988987b39accba39872db50395165ad37e83f752cb83caab5b8
const startGanacheServerAndDeployEthrDidRegistry = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const issuer = new ethr_did_1.EthrDID({
      txSigner,
      provider,
      identifier: "0x73762527535233CDaF90858A2D1C98243a7C3E71",
      privateKey:
        "68136eeb0f18517f705d875e3d37899d228777dd1dd58da575093612156a263e",
      rpcUrl,
      chainNameOrId: "ganache",
      registry: contractAddress,
    });
    console.log("Issuer::" + issuer.did);
    const holder = new ethr_did_1.EthrDID({
      // AHRI
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
    const vcPayload1 = {
      sub: "did:ethr:ganache:0x2D6A3F0cE64A7c9F43Da9b28253CA56d192f821e",
      nbf: 1562950282,
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "PassportCredential"],
        credentialSubject: {
          passportInfo: {
            user_name: "HONG GILDONG",
            country_code: "KOR",
            age: "18",
            sex: "M",
            birth: "19920101",
            personal_id: "0406171000000",
            did: "did:ethr:ganache:0x02d9417057f1a9aa8307a887fc5bb1499666de3e10c6affd7eb9f5f6698a36f737",
            photo_uri:
              "https://images.unsplash.com/photo-1576828831022-ca41d3905fb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1023&q=80",
            creation_date: "2022-05-12 05:51:23",
          },
        },
      },
    };
    const vcPayload2 = {
      sub: "did:ethr:ganache:0x2D6A3F0cE64A7c9F43Da9b28253CA56d192f821e",
      nbf: 1562950282,
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "VisaCredential"],
        credentialSubject: {
          visa: {
            // 이름 생년월일 성별 비자종류 발급일 만료일
            visa_name: "2022 VISA",
            visa_purpose: "TOUR",
            country_code: "KOR",
            visa_expired_date: "20230511",
            visa_creation_date: "20220511",
            user_name: "HONG GILDONG",
            birth: "19920101",
            sex: "M",
          },
        },
      },
    };
    const vcPayload3 = {
      sub: "did:ethr:ganache:0x2D6A3F0cE64A7c9F43Da9b28253CA56d192f821e",
      nbf: 1562950282,
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "StampCredential"],
        credentialSubject: {
          stampInfo:
            "https://ipfs.infura.io/ipfs/QmeMYG2A543rpLDfUrKcgV4uCPVSBD8kd6bShGKWBdKD35",
        },
      },
    };
    const vcJwt1 = yield (0, did_jwt_vc_1.createVerifiableCredentialJwt)(
      vcPayload1,
      issuer,
    );
    const vcJwt2 = yield (0, did_jwt_vc_1.createVerifiableCredentialJwt)(
      vcPayload2,
      issuer,
    );
    const vcJwt3 = yield (0, did_jwt_vc_1.createVerifiableCredentialJwt)(
      vcPayload3,
      issuer,
    );
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
    // console.log("PASSPORT VC ::" + vcJwt1);
    // console.log("\nVISA VC::" + vcJwt2);
    // console.log("\nSTAMP VC::" + vcJwt3);
    const vpPayload = {
      vp: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiablePresentation"],
        verifiableCredential: [vcJwt1, vcJwt2, vcJwt3],
      },
    };
    const vpJwt = yield (0, did_jwt_vc_1.createVerifiablePresentationJwt)(
      vpPayload,
      issuer,
    );
    console.log("VPJWT::" + vpJwt);
  });
exports.startGanacheServerAndDeployEthrDidRegistry =
  startGanacheServerAndDeployEthrDidRegistry;
