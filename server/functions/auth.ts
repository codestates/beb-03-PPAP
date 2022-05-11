// access token을 인자로 받음
// access token 디코딩
// 디코딩한 토큰에 휴대폰 번호 있는지 없는지 판단
// 있으면 관리자 --> 어떤 관리자인지 db에서 검색
// 없으면 사용자 --> 어떤 사용자인지 db에서 검색
const jwt = require('jsonwebtoken');
const query = require('../mysql/query/query');
const bcrypt = require('bcrypt');
const { accessTokenSecret } = require('../config');

export const auth = async (authorization: any) => {
    try {
        const token = authorization;
        const data = await jwt.verify(token, accessTokenSecret);
        if (data.phoneNum) {
            // 사용자 인증 로직
            // 나중에 db에서 did 유무 판별
            const userPhone = data.phoneNum;
            // 쿼리
            return new Promise((resolve, reject) => {
                const data = query.getUser(
                    'phoneNum',
                    userPhone,
                    (err: any, data: any) => {
                        if (err) {
                            // error handling code goes here
                            console.log('ERROR : ', err);
                        } else {
                            if (data) {
                                resolve(data[0]);
                            }
                        }
                    }
                );
            });
        } else {
            // 관리자 인증 로직
            if (data.did) {
                // did로 관리자 검색
                const adminDID = data.did;
                console.log('=======', adminDID);
                return new Promise((resolve, reject) => {
                    const output = query.getAdmin(
                        'did',
                        adminDID,
                        (err: any, data: any) => {
                            if (err) {
                                // error handling code goes here
                                console.log('ERROR : ', err);
                            } else {
                                if (data) {
                                    resolve(data[0]);
                                }
                            }
                        }
                    );
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
};

// password로 db에서 관리자 찾아주는 함수
export const getAdminDid = async (id: any, password: any) => {
    try {
        return new Promise((resolve, reject) => {
            query.getAdmin('userId', id, (err: any, data: any) => {
                if (err) {
                    // error handling code goes here
                    console.log('ERROR : ', err);
                } else {
                    if (data.length === 0) {
                        resolve({
                            userId: null,
                            password: null,
                        });
                    } else {
                        bcrypt
                            .compare(password, data[0].password)
                            .then((res: any) => {
                                if (res) {
                                    resolve(data[0]);
                                } else {
                                    resolve({
                                        userId: data[0].userId,
                                        password: null,
                                    });
                                }
                            });
                    }
                }
            });
        });
    } catch (e) {
        console.log(e);
    }
};
