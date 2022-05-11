import { Request, Response, NextFunction } from 'express';
const { didContractAdd, issuerDid } = require('../config');
import { verifyCredential, verifyPresentation } from 'did-jwt-vc';
const jwt = require('jsonwebtoken');
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import createIPFS from '../functions/createIPFS.js';
import { auth, getAdminDid } from '../functions/auth';

const genAccessToken = (data: any) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });
};

const adminAuth = async (authorization: any) => {
    let output: any = await auth(authorization);
    console.log(output);
    // .then으로 resolve, reject 경우 나눠서 처리
    // console.log('@@@@@@@', output.userId);
    return output;
};

export const adminLogin = async (req: Request, res: Response) => {
    const { id, password } = req.body;
    //adminAuth=> did를 이용해서 access token 발급
    const output: any = await getAdminDid(id, password);
    console.log(output);
    if (output.userId) {
        if (output.password) {
            const tokenData = {
                did: output.did,
            };
            const accessToken = genAccessToken(tokenData);
            res.status(200).send({
                data: accessToken,
                message: 'Login Success',
            });
        } else {
            res.status(200).send({ data: null, message: 'Wrong password' });
        }
    } else {
        res.status(200).send({ data: null, message: 'Invalid id' });
    }
};

export const makePassport = async (req: Request, res: Response) => {
    const authorization = req.headers['authorization'];
    const output = await adminAuth(authorization);
    res.status(200).send({ output });
};

export const makeVisa = async (req: Request, res: Response) => {
    const { test } = req.body;
    const msg = `test post method makeVisa : ${test}`;
    console.log(msg);
    res.send({ msg: msg });
};

// 여권검증 라우터
// 홀더가 보낸 vpJWT를
// 1. vp verifyPresentation(홀더 did 확인)
// 2. vc verifyCredential(여권, 비자 vc 확인, 이슈어 did 확인)
// 3. 두 작업이 완료되면 스탬프 발행

// 스탬프 발행 함수
// 발급일자, 이미지를 ipfs에 json형태로 업로드
// ipfs url을 db에 업로드

// 도장 발행 함수
const makeStamp = async () => {
    const metaData = {
        timeStamp: new Date(),
        country: 'Korea',
        countryImg:
            'https://ipfs.infura.io/ipfs/QmeLrCEtsm28qqf2S7KSwo7QYFiNzwjfY9AJn8xLs8VQWF',
    };
    // const Korea = fs.readFileSync(path.resolve(__dirname, "./Korea.png"));
    const url = await createIPFS(metaData);
    console.log('url :', url);
    return url;
};

export const verifyPassport = async (req: Request, res: Response) => {
    try {
        const { did, vpJWT } = req.body; // 추후 입/출국 정보도 바디로 올 예정
        console.log(vpJWT);

        const providerConfig = {
            name: 'ganache',
            rpcUrl: 'http://localhost:7545',
            registry: didContractAdd,
        };
        const ethrDidResolver = getResolver(providerConfig);
        const didResolver = new Resolver(ethrDidResolver);
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
                console.log('verifiedVC@@@', verifiedVC);
                console.log(`vc발급자 : ${verifiedVC.payload.iss}`); // vc발급자는 issuer did와 같아야함
                console.log(`여권, 비자 vc 확인, 이슈어 did 확인...`);
                if (verifiedVC.payload.iss !== issuerDid) {
                    // issuerDID가 아닌 vc가 있으면 바로 오류 응답
                    res.status(400).send({
                        message: 'vc 서명자가 issuer가 아닙니다.',
                    });
                }
                // 조건문 더 추가(여권,비자검증)
            }
            // 반복문 종료 후 stamp발행 실행
            makeStamp();
            res.status(200).send({
                message: '검증 성공, 출입국 도장 발행 완료',
            });
        } else {
            res.status(400).send({ message: 'vp 서명자가 holder가 아닙니다.' });
        }
    } catch (e) {
        console.log(e);
    }
};
