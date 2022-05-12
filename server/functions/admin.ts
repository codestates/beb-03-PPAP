const query = require("../mysql/query/query");
import { auth } from "../functions/auth";
import createIPFS from "../functions/createIPFS.js";

// 관리자 인증
export const adminAuth = async (authorization: any) => {
  let output: any = await auth(authorization);
  console.log(output);
  // .then으로 resolve, reject 경우 나눠서 처리
  // console.log('@@@@@@@', output.userId);
  return output;
};

// successyn이 0인 여권 목록 조회
export const getPassport_zero = async (successyn: any) => {
  try {
    return new Promise((resolve, reject) => {
      const Passportdata = query.getPassport(
        "successyn",
        successyn,
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

// success_yn이 0인 비자 요청 목록 조회
export const getVisa_zero = async (successyn: any) => {
  try {
    return new Promise((resolve, reject) => {
      const VisaRequestdata = query.getVisaSurveyList(
        "success_yn",
        successyn,
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
export const makeStamp = async () => {
  const metaData = {
    timeStamp: new Date(),
    country: "Korea",
    countryImg:
      "https://ipfs.infura.io/ipfs/QmeLrCEtsm28qqf2S7KSwo7QYFiNzwjfY9AJn8xLs8VQWF",
  };
  // const Korea = fs.readFileSync(path.resolve(__dirname, "./Korea.png"));
  const url = await createIPFS(metaData);
  console.log("url :", url);
  return url;
};
