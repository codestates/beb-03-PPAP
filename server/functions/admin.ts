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
      query.getPassport(countryCode, (err: any, data: any) => {
        if (err) {
          // error handling code goes here
          console.log("ERROR : ", err);
        } else {
          if (data) {
            resolve(data);
          }
        }
      });
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
      query.getVisaSurveyList(countryCode, (err: any, data: any) => {
        if (err) {
          // error handling code goes here
          console.log("ERROR : ", err);
        } else {
          if (data) {
            resolve(data);
          }
        }
      });
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
      query.updateRequest(
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
        },
      );
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 비자 발급 승인/거절
export const UpdateVisaReq = async (successyn: any, visa_survey_id: any) => {
  try {
    return new Promise((resolve, reject) => {
      query.updateRequest(
        "GOVERN_FA_VISA_SURVEY",
        "success_yn",
        successyn,
        "visa_survey_id",
        visa_survey_id,
        (err: any, data: any) => {
          if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
          } else {
            if (data) {
              resolve(data);
            }
          }
        },
      );
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 스탬프 조회 - 출국
export const getEntOrDepStamp = async (entOrdep: any, countryCode: any) => {
  try {
    return new Promise((resolve, reject) => {
      query.getUserStamp(entOrdep, countryCode, (err: any, data: any) => {
        if (err) {
          // error handling code goes here
          reject(err);
          console.log("ERROR : ", err);
        } else {
          if (data) {
            resolve(data);
          }
        }
      });
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 도장 IPFS 발행 함수
export const makeStamp = async (
  entOrdep: any,
  country_code: any,
  country_img_url: any,
) => {
  let ent_or_dep = "NO DATA";
  if (entOrdep === "1") {
    ent_or_dep = "entrance";
  } else if (entOrdep === "2") {
    ent_or_dep = "departure";
  } else {
    return null;
  }
  const metaData = {
    timeStamp: new Date(),
    Immigration: ent_or_dep,
    countryCode: country_code,
    countryImg: country_img_url,
  };
  // const Korea = fs.readFileSync(path.resolve(__dirname, "./Korea.png"));
  const url = await createIPFS(metaData);
  console.log("url :", url);
  return url;
};

// did로 홀더 여권 정보 검색
export const findHolderDid = async (holder_did: any) => {
  try {
    return new Promise((resolve, reject) => {
      query.getUserByDid(holder_did, (err: any, data: any) => {
        if (err) {
          // error handling code goes here
          reject(err);
          console.log("ERROR : ", err);
        } else {
          if (data) {
            if (data.length === 1) {
              const holder = data[0];
              // 도장 등록 함수(addStampToDb) resolve
              resolve(holder);
            } else {
              resolve({ message: "No matched user" });
            }
          }
        }
      });
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 출입국 도장 등록 함수
export const updateStamp = async (
  passport_id: any,
  stamp_uri: any,
  country_code: any,
  stamp_expired_date: any,
  ent_or_dep: any,
) => {
  try {
    return new Promise((resolve, reject) => {
      query.updateStampTable(
        passport_id,
        stamp_uri,
        country_code,
        stamp_expired_date,
        ent_or_dep,
        (err: any, data: any) => {
          if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
          } else {
            if (data) {
              resolve(data);
            }
          }
        },
      );
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 회원 did & vp 저장
export const saveUserDidandVp = async (
  vpJwt: any,
  did: any,
  countryCode: any,
) => {
  try {
    return new Promise((resolve, reject) => {
      query.storeUserDidAndVp(
        vpJwt,
        did,
        countryCode,
        (err: any, data: any) => {
          if (err) {
            // error handling code goes here
            reject(err);
            console.log("ERROR : ", err);
          } else {
            if (data) {
              resolve(data);
            }
          }
        },
      );
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 회원 did & vp 삭제
export const deleteUserDidandVp = async (did: any) => {
  try {
    return new Promise((resolve, reject) => {
      query.deleteRow(
        "GOVERN_IMMIGRATION_SURVEY",
        "did",
        did,
        (err: any, data: any) => {
          if (err) {
            // error handling code goes here
            reject(err);
            console.log("ERROR : ", err);
          } else {
            if (data) {
              resolve(data);
            }
          }
        },
      );
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

// 회원 did & vp 가져오기
export const getUserDidandVp = async (countryCode: any) => {
  try {
    return new Promise((resolve, reject) => {
      query.getTargetData(
        "GOVERN_IMMIGRATION_SURVEY",
        "country_code",
        countryCode,
        (err: any, data: any) => {
          if (err) {
            // error handling code goes here
            reject(err);
            console.log("ERROR : ", err);
          } else {
            if (data) {
              resolve(data);
            }
          }
        },
      );
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};
