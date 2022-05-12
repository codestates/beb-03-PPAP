const query = require("../mysql/query/query");

// successyn이 0인 여권 목록 조회
export const getPassport_zero = async (successyn: any) => {
  try {
    return new Promise((resolve, reject) => {
      const data = query.getPassport(
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
      const data = query.getVisaSurveyList(
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
