// access token을 인자로 받음
// access token 디코딩
// 디코딩한 토큰에 휴대폰 번호 있는지 없는지 판단
// 있으면 관리자 --> 어떤 관리자인지 db에서 검색
// 없으면 사용자 --> 어떤 사용자인지 db에서 검색
const jwt = require("jsonwebtoken");
const query = require("../mysql/query/query");
// config에서 access secret들고 오기
export const auth = async (authorization: any) => {
  try {
    console.log(authorization);
    const token = authorization;
    let userInfo = null;
    const data = await jwt.verify(token, "asdfawefwaerfawdsfasdf");
    if (data.phoneNum) {
      // 사용자 인증 로직
      // 나중에 db에서 did 유무 판별
      const userPhone = data.phoneNum;
      // 쿼리
      await query.getUser("phoneNum", userPhone, (err: any, data: any) => {
        if (err) {
          // error handling code goes here
          console.log("ERROR : ", err);
        } else {
          if (data) {
            for (let i = 0; i < data.length; i++) {
              console.log(data[i]);
              userInfo = data[i];
            }
          }
        }
      });
      console.log("=========", userInfo);
      return userInfo;
    } else {
      // 관리자 인증 로직
      const adminDID = data.did;
    }
  } catch (e) {
    console.log(e);
  }
};
