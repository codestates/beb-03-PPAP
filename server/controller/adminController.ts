import { getEntOrDepStamp } from "./../functions/admin";
import { Request, Response, NextFunction } from "express";
const { didContractAdd, issuerDid } = require("../config");
import {
  JwtCredentialPayload,
  verifyCredential,
  verifyPresentation,
  createVerifiableCredentialJwt,
} from "did-jwt-vc";
const jwt = require("jsonwebtoken");
import { Resolver } from "did-resolver";
import { getResolver } from "ethr-did-resolver";
const CountryIpfs = require("../countryUrl/CountryIpfsUrl");
import {
  getPassportList,
  getVisaList,
  adminAuth,
  makeStamp,
  UpdatePassportReq,
  UpdateVisaReq,
  findHolderDid,
  updateStamp,
} from "../functions/admin";
import { genAccessToken } from "../functions/genAccessToken";
const query = require("../mysql/query/query");
import { getAdminDid } from "../functions/auth";
import createIssuerDID from "../functions/createIssuerDID";

// 관리자 로그인
export const adminLogin = async (req: Request, res: Response) => {
  const { id, password } = req.body;
  //adminAuth=> did를 이용해서 access token 발급
  const output: any = await getAdminDid(id, password);
  console.log("!@#!$!@$", output);
  if (output.user_id) {
    if (output.password) {
      const tokenData = {
        did: output.did,
      };
      const accessToken = genAccessToken(tokenData);
      res.status(200).send({
        data: accessToken,
        message: "Login Success",
        profile_url: CountryIpfs[output.country_code],
      });
    } else {
      res.status(401).send({ data: null, message: "Wrong password" });
    }
  } else {
    res.status(401).send({ data: null, message: "Invalid id" });
  }
};

//여권 신청 목록 가져오기
export const getPassportRequests = async (req: Request, res: Response) => {
  const authorization = req.headers["authorization"];
  if (!authorization) res.status(401).send({ message: "no Auth header" });
  const admin = await adminAuth(authorization);
  if (issuerDid.includes(admin.did)) {
    // admin의 did일 때만 동작
    // 쿼리 날려서 받아오기
    try {
      let output: any = await getPassportList(admin.country_code);
      console.log(output);
      if (output.length >= 1) {
        res.status(200).send({ passportRequests: output, message: "success" });
      } else {
        res.status(200).send({ message: "there are no requests" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "server error" });
    }
  } else {
    // 토큰이 이상한게 와서 디코딩이 안되면 앱이 아예 크러쉬나는데,, -> 태희님과 상의
    res.status(401).send({ message: "Admin Auth fail" });
  }
};

// 비자 신청 목록 가져오기
export const getVisaRequests = async (req: Request, res: Response) => {
  const authorization = req.headers["authorization"];
  if (!authorization) res.status(401).send({ message: "no Auth header" });
  const admin = await adminAuth(authorization);
  if (issuerDid.includes(admin.did)) {
    // admin의 did일 때만 동작
    // 쿼리 날려서 받아오기
    try {
      let output: any = await getVisaList(admin.country_code);
      console.log(output);
      if (output.length >= 1) {
        res.status(200).send({ visaRequests: output, message: "success" });
      } else {
        res.status(200).send({ message: "there are no requests" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "server error" });
    }
  } else {
    // 토큰이 이상한게 와서 디코딩이 안되면 앱이 아예 크러쉬나는데,, -> 태희님과 상의
    res.status(401).send({ message: "Admin Auth fail" });
  }
};

// 여권 발급 승인/거절
export const makePassport = async (req: Request, res: Response) => {
  const authorization = req.headers["authorization"];
  const { passport_id, success_yn } = req.body;
  if (!authorization) res.status(401).send({ message: "no Auth header" });
  const admin = await adminAuth(authorization);
  if (issuerDid.includes(admin.did)) {
    // admin의 did일 때만 동작
    // 쿼리 날려서 받아오기
    if (success_yn > 2 || success_yn < 0) {
      res.status(400).send({ message: "invalid success_yn" });
    } else {
      let output: any = await UpdatePassportReq(success_yn, passport_id);
      if (output.affectedRows === 1) {
        res.status(200).send({ message: "passport update success" });
      } else if (output.affectedRows === 0) {
        res.status(400).send({
          message: `There is no matched data wite passport_id = ${passport_id}`,
        });
      } else {
        res.status(400).send({
          message: "check db",
        });
      }
    }
  } else {
    // 토큰이 이상한게 와서 디코딩이 안되면 앱이 아예 크러쉬나는데,, -> 태희님과 상의
    res.status(401).send({ message: "Admin Auth fail" });
  }
};

// 비자 발급 승인/거절 UpdateVisaReq
export const makeVisa = async (req: Request, res: Response) => {
  const authorization = req.headers["authorization"];
  const { visa_survey_id, success_yn } = req.body;
  if (!authorization) res.status(401).send({ message: "no Auth header" });
  const admin = await adminAuth(authorization);
  if (issuerDid.includes(admin.did)) {
    // admin의 did일 때만 동작
    // 쿼리 날려서 받아오기
    if (success_yn > 2 || success_yn < 0) {
      res.status(400).send({ message: "invalid success_yn" });
    } else {
      let output: any = await UpdateVisaReq(success_yn, visa_survey_id);
      if (output.affectedRows === 1) {
        res.status(200).send({ message: "visa request update success" });
      } else if (output.affectedRows === 0) {
        res.status(400).send({
          message: `There is no matched data wite visa_survey_id = ${visa_survey_id}`,
        });
      } else {
        res.status(400).send({
          message: "check db",
        });
      }
    }
  } else {
    // 토큰이 이상한게 와서 디코딩이 안되면 앱이 아예 크러쉬나는데,, -> 태희님과 상의
    res.status(401).send({ message: "Admin Auth fail" });
  }
};

// 입국 스탬프 조회할때
// export const getStamp = async (req: Request, res: Response) => {
//   const authorization = req.headers["authorization"];
//   const stampFlag = req.query.entOrdep;
//   if (!authorization) res.status(401).send({ message: "no Auth header" });
//   const admin = await adminAuth(authorization);
//   if (issuerDid.includes(admin.did)) {
//     try {
//       let output: any = await getEntOrDepStamp(stampFlag, admin.country_code);
//       console.log("@@@@@@@@@@@@", output);
//       if (output.length === 0) {
//         res.status(200).send({ message: "there is no stamp data" });
//       } else {
//         res.status(200).send({ output, message: "success" });
//       }
//     } catch (e) {
//       res.status(400).send({ message: e });
//     }
//   } else {
//     // 토큰이 이상한게 와서 디코딩이 안되면 앱이 아예 크러쉬나는데,, -> 태희님과 상의
//     res.status(401).send({ message: "Admin Auth fail" });
//   }
// };

// 여권검증 라우터
// 홀더가 보낸 vpJWT를
// 1. vp verifyPresentation(홀더 did 확인)
// 2. vc verifyCredential(여권, 비자 vc 확인, 이슈어 did 확인)
// 3. 두 작업이 완료되면 스탬프 발행
export const verifyPassport = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers["authorization"];
    // entOrdep : 출입국정보
    // Departure - 출국
    // Entrance - 입국
    const { did, vpJWT } = req.body; // 질문 : did가 여권 Db에 있는지 검사해야하나?
    if (!did || !vpJWT)
      res.status(400).send({ message: "Please check your request " });
    try {
      // *** user_client 테이블에서 조회하도록 변경
      // const holderFinding: any = await findHolderDid(did);
      // console.log(holderFinding);
      // if (!holderFinding) res.status(400).send({ message: "Invalid DID" });
      // else {
      // holder가 있어야지 아래 코드들이 동작하도록 재구성
      const providerConfig = {
        name: "ganache",
        rpcUrl: "http://192.168.35.214:7545",
        registry: didContractAdd,
      };
      const ethrDidResolver = getResolver(providerConfig);
      const didResolver = new Resolver(ethrDidResolver);
      // console.log(vpJWT);
      if (!authorization) res.status(401).send({ message: "no Auth header" });
      const admin = await adminAuth(authorization);
      if (issuerDid.includes(admin.did)) {
        // issuer did 확인 후 검증 진행
        // vp 디코딩
        const verifiedVP = await verifyPresentation(vpJWT, didResolver);
        console.log(verifiedVP.payload.iss);
        if (verifiedVP.payload.iss === did) {
          // vp서명자 === 홀더인지확인
          // vp서명자가 홀더일 때만 vc검증과정 진행
          // vc검증시작
          const vcArr = verifiedVP.payload.vp.verifiableCredential; // vc어레이추출
          let VClist = {
            passport_info: null,
            visa: null,
            stamp_list: null,
          };
          console.log(vcArr);
          for (let i = 0; i < vcArr.length; i++) {
            let verifiedVC = await verifyCredential(vcArr[i], didResolver);
            console.log("verifiedVC@@@", verifiedVC);
            console.log(`vc발급자 : ${verifiedVC.payload.iss}`); // vc발급자는 issuer did와 같아야함
            console.log(`여권, 비자 vc 확인, 이슈어 did 확인...`);
            if (!issuerDid.includes(verifiedVC.payload.iss)) {
              // issuerDID가 아닌 vc가 있으면 바로 오류 응답
              // 어떤 vc에서 에러났는지 알려주면 좋을듯
              res.status(400).send({
                message: "vc 서명자가 issuer가 아닙니다.",
              });
            }
            // TODO
            // 여권, 비자, 스탬프 정보 client로 돌려주기
            // 1. passportInfo
            else {
              if (
                verifiedVC.verifiableCredential.credentialSubject.passportInfo
              ) {
                const passport_info =
                  verifiedVC.verifiableCredential.credentialSubject
                    .passportInfo;
                VClist.passport_info = passport_info;
              } else if (
                verifiedVC.verifiableCredential.credentialSubject.visa
              ) {
                const visa =
                  verifiedVC.verifiableCredential.credentialSubject.visa;
                VClist.visa = visa;
              } else {
                // visa_list : 어드민 국가 -> 최신날짜기준1개만 검사// 애초에 1개만 옴
                if (
                  verifiedVC.verifiableCredential.credentialSubject.stampInfo
                ) {
                  const stamp_list =
                    verifiedVC.verifiableCredential.credentialSubject.stampInfo;
                  VClist.stamp_list = stamp_list;
                }
              }

              console.log(`###PassportInfo : ${VClist.passport_info}`);
              console.log(`###visaList : ${VClist.visa}`);
              console.log(`###stampList : ${VClist.stamp_list}`);
            }
          }
          if (VClist.passport_info && VClist.visa) {
            res.status(200).send({
              VClist,
              message: "success",
            });
          }
        } else {
          res.status(400).send({ message: "vp 서명자가 holder가 아닙니다." });
        }
      } else {
        // 토큰이 이상한게 와서 디코딩이 안되면 앱이 아예 크러쉬나는데,, -> 태희님과 상의
        res.status(401).send({ message: "Admin Auth fail" });
      }
      // }
    } catch (e) {
      console.log("여기잉ㄴ가?");
      res.status(400).send({ ERROR: "Cannot resolve VP" });
    }
  } catch (e) {
    console.log(e);
  }
};

export const giveStamp = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers["authorization"];
    const { did, entOrdep } = req.body; // entOrdep === 1 : ent, 2 : dep
    if (!authorization) res.status(401).send({ message: "no Auth header" });
    if (!did || !entOrdep)
      res.status(400).send({ message: "Check your Request Body data" });
    const admin = await adminAuth(authorization);
    if (issuerDid.includes(admin.did)) {
      try {
        const holderInfo: any = await findHolderDid(did);
        // entOrdep : 출입국정보
        if (holderInfo.message) {
          res.status(400).send(holderInfo); // No matched User
        } else {
          let ent_or_dep = "NO DATA";
          if (entOrdep === "1") {
            ent_or_dep = "ent";
          } else if (entOrdep === "2") {
            ent_or_dep = "dep";
          } else {
            res.status(400).send({ message: "invalid entOrdep" });
          }
          const stampurl = await makeStamp(
            entOrdep,
            admin.country_code,
            CountryIpfs[admin.country_code]
          );

          // stamp url을 db에도 등록(did로 passport table에서 누군지 찾아서 등록)

          const issuer: any = await createIssuerDID();
          const stampVcPayload: JwtCredentialPayload = {
            sub: did,
            nbf: 1562950282,
            vc: {
              "@context": ["https://www.w3.org/2018/credentials/v1"],
              type: ["VerifiableCredential", "PassportCredential"],
              credentialSubject: {
                stampInfo: {
                  stamp_uri: stampurl,
                  ent_or_dep: ent_or_dep,
                  country_code: admin.country_code,
                  creation_date: new Date(),
                },
              },
            },
          };

          const stampVcJwt = await createVerifiableCredentialJwt(
            stampVcPayload,
            issuer
          );
          res.status(200).send({ vcJwt: stampVcJwt, message: "success" });
        }
      } catch (e) {
        res.status(400).send({ message: e });
      }
    } else {
      // 토큰이 이상한게 와서 디코딩이 안되면 앱이 아예 크러쉬나는데,, -> 태희님과 상의
      res.status(401).send({ message: "Admin Auth fail" });
    }
  } catch (e) {
    console.log(e);
  }
};
