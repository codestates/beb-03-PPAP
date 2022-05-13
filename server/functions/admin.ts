const query = require("../mysql/query/query");
import { auth } from "../functions/auth";
import createIPFS from "../functions/createIPFS.js";

// 관리자 인증
export const adminAuth = async (authorization: any) => {
  let output: any = await auth(authorization);
  console.log("admin Auth : ", output);
  // .then으로 resolve, reject 경우 나눠서 처리
  // console.log('@@@@@@@', output.userId);
  return output;
};

// 여권 목록 조회
export const getPassportList = async (countryCode: any) => {
  try {
    return new Promise((resolve, reject) => {
      const Passportdata = query.getPassport(
        countryCode,
        (err: any, data: any) => {
          if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
          } else {
            if (data) {
              resolve(data);
            }
          }
        }
      );
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 비자 요청 목록 조회
export const getVisaList = async (countryCode: any) => {
  try {
    return new Promise((resolve, reject) => {
      const VisaRequestdata = query.getVisaSurveyList(
        countryCode,
        (err: any, data: any) => {
          if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
          } else {
            if (data) {
              resolve(data);
            }
          }
        }
      );
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 여권 발급 승인/거절
export const UpdatePassportReq = async (successyn: any, passport_id: any) => {
  try {
    return new Promise((resolve, reject) => {
      const PassportUpdate = query.updateRequest(
        "GOVERN_FA_PASSPORT",
        "success_yn",
        successyn,
        "passport_id",
        passport_id,
        (err: any, data: any) => {
          if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
          } else {
            if (data) {
              resolve(data);
            }
          }
        }
      );
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 비자 발급 승인/거절
export const UpdateVisaReq = async (successyn: any, passport_id: any) => {
  try {
    return new Promise((resolve, reject) => {
      const VisaUpdate = query.updateRequest(
        "GOVERN_FA_VISA_SURVEY",
        "success_yn",
        successyn,
        "passport_id",
        passport_id,
        (err: any, data: any) => {
          if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
          } else {
            if (data) {
              resolve(data);
            }
          }
        }
      );
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 도장 발행 함수
export const makeStamp = async (
  entOrdep: any,
  country_code: any,
  country_img_url: any
) => {
  const metaData = {
    timeStamp: new Date(),
    Immigration: entOrdep,
    countryCode: country_code,
    countryImg: country_img_url,
  };
  // const Korea = fs.readFileSync(path.resolve(__dirname, "./Korea.png"));
  const url = await createIPFS(metaData);
  console.log("url :", url);
  return url;
};

// 출입국 도장 db에 등록
export const findHolderDid = async (holder_did: any) => {
  try {
    return new Promise((resolve, reject) => {
      const FindHolder = query.getPassportForStamp(
        holder_did,
        (err: any, data: any) => {
          if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
          } else {
            if (data) {
              if (data.length === 1) {
                const holder = data[0];
                // 도장 등록 함수(addStampToDb) resolve
                resolve(holder);
              }
            }
          }
        }
      );
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const updateStamp = async (
  passport_id: any,
  stamp_uri: any,
  country_code: any,
  stamp_expired_date: any
) => {
  try {
    return new Promise((resolve, reject) => {
      const StampUpdate = query.updateStampTable(
        passport_id,
        stamp_uri,
        country_code,
        stamp_expired_date,
        (err: any, data: any) => {
          if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
          } else {
            if (data) {
              resolve(data);
            }
          }
        }
      );
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};
