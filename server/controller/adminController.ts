import { Request, Response, NextFunction } from "express";
const { didContractAdd, issuerDid } = require("../config");
import { verifyCredential, verifyPresentation } from "did-jwt-vc";
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
} from "../functions/admin";
import { genAccessToken } from "../functions/genAccessToken";
const query = require("../mysql/query/query");
import { getAdminDid } from "../functions/auth";
import { id } from "ethers/lib/utils";

// 관리자 로그인
export const adminLogin = async (req: Request, res: Response) => {
  const { id, password } = req.body;
  //adminAuth=> did를 이용해서 access token 발급
  const output: any = await getAdminDid(id, password);
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
    let output: any = await getPassportList(admin.country_code);
    console.log(output);
    if (output.length >= 1) {
      res.status(200).send({ passportRequests: output, message: "success" });
    } else {
      res.status(200).send({ message: "there are no requests" });
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
    let output: any = await getVisaList(admin.country_code);
    console.log(output);
    if (output.length >= 1) {
      res.status(200).send({ visaRequests: output, message: "success" });
    } else {
      res.status(200).send({ message: "there are no requests" });
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
  const { passport_id, success_yn } = req.body;
  if (!authorization) res.status(401).send({ message: "no Auth header" });
  const admin = await adminAuth(authorization);
  if (issuerDid.includes(admin.did)) {
    // admin의 did일 때만 동작
    // 쿼리 날려서 받아오기
    if (success_yn > 2 || success_yn < 0) {
      res.status(400).send({ message: "invalid success_yn" });
    } else {
      let output: any = await UpdateVisaReq(success_yn, passport_id);
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

// 여권검증 라우터
// 홀더가 보낸 vpJWT를
// 1. vp verifyPresentation(홀더 did 확인)
// 2. vc verifyCredential(여권, 비자 vc 확인, 이슈어 did 확인)
// 3. 두 작업이 완료되면 스탬프 발행

// 스탬프 발행 함수
// 발급일자, 이미지를 ipfs에 json형태로 업로드
// ipfs url을 db에 업로드

export const verifyPassport = async (req: Request, res: Response) => {
  try {
    const authorization = req.headers["authorization"];
    // entOrdep : 출입국정보
    // Departure - 출국
    // Entrance - 입국
    const { did, vpJWT, entOrdep } = req.body;
    if (!did || !vpJWT || !entOrdep)
      res.status(400).send({ message: "Please check your request " });
    const providerConfig = {
      name: "ganache",
      rpcUrl: "http://localhost:7545",
      registry: didContractAdd,
    };
    const ethrDidResolver = getResolver(providerConfig);
    const didResolver = new Resolver(ethrDidResolver);
    console.log(vpJWT);
    if (!authorization) res.status(401).send({ message: "no Auth header" });
    const admin = await adminAuth(authorization);
    if (issuerDid.includes(admin.did)) {
      // 여기서 실행
      // vp 디코딩
      const verifiedVP = await verifyPresentation(vpJWT, didResolver);
      console.log(verifiedVP.payload.iss);
      if (verifiedVP.payload.iss === did) {
        // vp서명자 === 홀더인지확인
        // vp서명자가 홀더일 때만 vc검증과정 진행
        // vc검증시작
        const vcArr = verifiedVP.payload.vp.verifiableCredential; // vc어레이추출
        console.log(vcArr);
        for (let i = 0; i < vcArr.length; i++) {
          let verifiedVC = await verifyCredential(vcArr[i], didResolver);
          console.log("verifiedVC@@@", verifiedVC);
          console.log(`vc발급자 : ${verifiedVC.payload.iss}`); // vc발급자는 issuer did와 같아야함
          console.log(`여권, 비자 vc 확인, 이슈어 did 확인...`);
          if (!issuerDid.includes(verifiedVC.payload.iss)) {
            // issuerDID가 아닌 vc가 있으면 바로 오류 응답
            res.status(400).send({
              message: "vc 서명자가 issuer가 아닙니다.",
            });
          }
          // 조건문 더 추가(여권,비자검증)
        }
        // 반복문 종료 후 stamp발행 실행
        const stampurl = makeStamp(entOrdep);
        res.status(200).send({
          message: "검증 성공, 출입국 도장 발행 완료",
          stampurl,
        });
        // stamp url을 db에도 등록(did로 passport table에서 누군지 찾아서 등록)
      } else {
        res.status(400).send({ message: "vp 서명자가 holder가 아닙니다." });
      }
    } else {
      // 토큰이 이상한게 와서 디코딩이 안되면 앱이 아예 크러쉬나는데,, -> 태희님과 상의
      res.status(401).send({ message: "Admin Auth fail" });
    }
  } catch (e) {
    console.log(e);
  }
};
