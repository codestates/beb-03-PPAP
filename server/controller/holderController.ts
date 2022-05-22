const query = require('../mysql/query/query');
const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
import {
    JwtCredentialPayload,
    createVerifiableCredentialJwt,
    JwtPresentationPayload,
    createVerifiablePresentationJwt,
    verifyPresentation,
    verifyCredential,
} from 'did-jwt-vc';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import {
    getApprovedPassportData,
    getApprovedVisaData,
} from '../functions/holder';
import { auth } from '../functions/auth';
import createIssuerDID from '../functions/createIssuerDID';
const didContractAdd = '0x4C9B4DaCb456861dD165b1b4F02D3e1aDb5650F8';

const clientAuth = async (authorization: any) => {
    let output: any = await auth(authorization);
    return output;
};

export const requestPassport = async (req: Request, res: Response) => {
    const { photo_uri } = req.body;
    // JWT token from authorization header
    const authorization = req.headers['authorization'];
    // specify user using user data in DB
    const clientInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });
    // case when token is not valid
    if (clientInfo.name == 'JsonWebTokenError') {
        return res.status(400).send({ data: null, msg: 'invaild token' });
    }
    // add user photo data
    clientInfo.photo_uri = photo_uri;

    // submit request for issuing passport
    await query.requestPassForm(clientInfo, (err: any, data: any) => {
        if (err) {
            console.log('ERROR : ', err);
            res.status(400).send(err);
        }
        if (!data) {
            return res.status(400).send({
                data: null,
                msg: `You already have passport VC.`,
            });
        }

        if (data.affectedRows === 1) {
            // no request -> submit new request to DB
            query.getTargetData(
                'GOVERN_FA_PASSPORT',
                'client_id',
                clientInfo.client_id,
                (err: any, data: any) => {
                    res.status(200).send({
                        requestedData: data[0],
                        msg: 'Your request is sucessfully submitted',
                    });
                }
            );
        } else {
            if (data.success_yn === '0') {
                // already exist request
                res.status(401).send({
                    data: null,
                    msg: 'Your request is already transfered and not approved',
                });
            } else if (data.success_yn === '1') {
                // already exist passport
                res.status(401).send({
                    data: null,
                    msg: 'Your passport is approved. Get your passport.',
                });
            } else if (data.success_yn === '2') {
                // rejected passport
                res.status(401).send({
                    data: null,
                    msg: 'Your request is rejected.',
                });
            }
        }
    });
};

export const issuePassVC = async (req: Request, res: Response) => {
    // JWT token from authorization header
    const authorization = req.headers['authorization'];
    // specify user using user data in DB
    const holderInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });
    // case when token is not valid
    if (holderInfo.name == 'JsonWebTokenError') {
        return res.status(400).send({ data: null, msg: 'invaild token' });
    }

    // recall passport
    const passData = await getApprovedPassportData(holderInfo);
    if (passData.statusCode) {
        return res
            .status(passData.statusCode)
            .send({ data: null, msg: passData.msg });
    }

    // get issuer sign (not only issuer DID) to make VC
    const issuer: any = await createIssuerDID();

    // vc payload which contains passport and stamp data
    const vcPassPayload: JwtCredentialPayload = {
        sub: holderInfo.did,
        nbf: 1562950282,
        vc: {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            credentialSubject: {
                passportInfo: holderInfo,
            },
        },
    };
    // create vc as JWT token under issuer signing
    const vcPassJwt = await createVerifiableCredentialJwt(
        vcPassPayload,
        issuer
    );

    const condOption = {
        setCond: 'did',
        setVal: holderInfo.did,
        findCond: 'client_id',
        findVal: holderInfo.client_id,
    };

    // insert user did on GOVERN_USER_CLIENT table
    await query.updateRow(
        'GOVERN_USER_CLIENT',
        condOption,
        async (err: any, data: any) => {
            if (err) {
                console.log('ERROR : ', err);
                res.status(400).send(err);
            }
            if (data.affectedRows === 1) {
                // delete designated user's passport request form
                await query.deleteRow(
                    'GOVERN_FA_PASSPORT',
                    condOption.setCond,
                    condOption.setVal,
                    (err: any, data: any) => {
                        if (err) {
                            console.log('ERROR : ', err);
                            res.status(400).send(err);
                        }
                        console.log(data);
                    }
                );
            }
        }
    );

    res.status(200).send({
        data: { vcPassJwt: vcPassJwt },
        msg: 'get passport vc success',
    });
};

export const getAvailableVisa = async (req: Request, res: Response) => {
    // specify user using user data in DB
    await query.getAllData('GOVERN_FA_VISA', (err: any, data: any) => {
        if (err) {
            console.log('ERROR : ', err);
        } else {
            if (data.length === 0) {
                // case when available visa is empty
                return res
                    .status(400)
                    .send({ data: null, msg: 'no data matched' });
            } else {
                let countryList: any = [];
                let purposeList: any = [];
                data.forEach((elem: any, idx: number) => {
                    countryList.push(elem.country_code);
                    purposeList.push(elem.visa_purpose);
                });
                // using Set data type for avoid duplication of element
                countryList = Array.from(new Set(countryList));
                purposeList = Array.from(new Set(purposeList));
                return res.status(200).send({
                    data: {
                        rawData: data,
                        countryList: countryList,
                        purposeList: purposeList,
                    },
                    msg: 'get visa information success',
                });
            }
        }
    });
};

export const requestVisa = async (req: Request, res: Response) => {
    const { visa_purpose, target_country, vpPassJwt } = req.body;

    // JWT token from authorization header
    const authorization = req.headers['authorization'];
    // specify user using user data in DB
    const holderInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });
    // case when token is not valid
    if (holderInfo.name == 'JsonWebTokenError') {
        return res.status(400).send({ data: null, msg: 'invaild token' });
    }

    // check whether the client has passport or not
    const hasPassport: any = await new Promise((resolve) => {
        query.getTargetData(
            'GOVERN_USER_CLIENT',
            'did',
            holderInfo.did,
            (err: any, data: any) => {
                if (err) {
                    console.log('ERROR : ', err);
                    res.status(400).send(err);
                }
                resolve(data);
            }
        );
    });

    // case when there is no did in designated user on GOVERN_USER_CLIENT
    if (hasPassport.length === 0) {
        return res.status(400).send({
            data: null,
            msg: `You don't have passport. Make passport first.`,
        });
    }

    // verify VP token
    let passData: any;
    const providerConfig = {
        name: 'ganache',
        rpcUrl: 'http://192.168.35.214:7545',
        registry: didContractAdd,
    };
    const ethrDidResolver = getResolver(providerConfig);
    const didResolver = new Resolver(ethrDidResolver);
    // consider a case when passport VP Jwt token is invalid
    try {
        console.log(vpPassJwt);
        const verifiedVP = await verifyPresentation(vpPassJwt, didResolver);
       
         const vcPass = verifiedVP.payload.vp.verifiableCredential[0];
         const verifiedVC = await verifyCredential(vcPass, didResolver);
         passData = verifiedVC.payload.vc.credentialSubject.passportInfo;
      
    } catch (e) {
        console.log(e)
        return res
            .status(400)
            .send({ data: null, msg: 'invalid input passport VP' });
    }

    // did on holderInfo -> from access token
    // did on passData -> from VP in req.body
    if (holderInfo.did !== passData.did) {
        return res.status(400).send({
            data: null,
            msg: 'Not identified between token data and passport vc data',
        });
    }

    // option to find visa type
    const condOption = {
        visa_purpose: visa_purpose,
        country_code: target_country,
    };
    // get visa type under pre-setted option
    const visaType: any = await new Promise((resolve) => {
        query.getMultiCondData(
            'GOVERN_FA_VISA',
            condOption,
            (err: any, data: any) => {
                // requested visa doesn't exist
                if (data.length === 0) {
                    return res.status(400).send({
                        data: null,
                        msg: 'No available visa for your request',
                    });
                }
                resolve(data);
            }
        );
    });

    // specify requested visa type
    const reqVisa = visaType[0].visa_id;

    const reqForm = { did: passData.did, visa_id: reqVisa };

    // submit request for issuing visa
    await query.requestVisaForm(reqForm, (err: any, data: any) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        if (data.affectedRows == 1) {
            const condOption = {
                did: passData.did,
                visa_id: reqVisa,
            };
            // no request -> submit new request to DB
            query.getMultiCondData(
                'GOVERN_FA_VISA_SURVEY',
                condOption,
                (err: any, data: any) => {
                    if (err) {
                        console.log('ERROR : ', err);
                        res.status(400).send(err);
                    }
                    res.status(200).send({
                        requestedData: data[0],
                        msg: 'Your request is sucessfully submitted',
                    });
                }
            );
        } else {
            // already exist request & not approved
            if (data.success_yn === '0') {
                res.status(401).send({
                    data: null,
                    msg: 'Your request is already transfered and it does not approved yet.',
                });
            } else {
                res.status(401).send({
                    data: null,
                    msg: 'Your request is approved. Get your visa',
                });
            }
        }
    });
};

export const getReqVisaList = async (req: Request, res: Response) => {
    // JWT token from authorization header
    const authorization = req.headers['authorization'];
    // specify user using user data in DB
    const holderInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });
    // case when token is not valid
    if (holderInfo.name == 'JsonWebTokenError') {
        return res.status(400).send({ data: null, msg: 'invaild token' });
    }

    // get all requested visa which user submit request
    await query.getTargetData(
        'GOVERN_FA_VISA_SURVEY',
        'did',
        holderInfo.did,
        (err: any, data: any) => {
            if (err) {
                console.log('ERROR : ', err);
                res.status(400).send(err);
            }
            return res.status(200).send({
                data: { reqVisaList: data },
                msg: 'call requested visa list success',
            });
        }
    );
};

export const issueVisaVC = async (req: Request, res: Response) => {
    const { visa_survey_id } = req.body;
    // JWT token from authorization header
    const authorization = req.headers['authorization'];
    // specify user using user data in DB
    const holderInfo: any = await new Promise((resolve) => {
        resolve(clientAuth(authorization));
    });
    // case when token is not valid
    if (holderInfo.name == 'JsonWebTokenError') {
        return res.status(400).send({ data: null, msg: 'invaild token' });
    }

    // recall visa
    const reqInfo = { did: holderInfo.did, visa_survey_id: visa_survey_id };
    const visaData: any = await getApprovedVisaData(reqInfo);
    if (visaData.statusCode) {
        return res
            .status(visaData.statusCode)
            .send({ data: null, msg: visaData.msg });
    }

    // get issuer sign (not only issuer DID) to make VC
    const issuer: any = await createIssuerDID();

    // vc payload which contains passport and stamp data
    const vcVisaPayload: JwtCredentialPayload = {
        sub: holderInfo.did,
        nbf: 1562950282,
        vc: {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiableCredential'],
            credentialSubject: {
                visa: visaData,
            },
        },
    };
    // create vc as JWT token under issuer signing
    const vcVisaJwt = await createVerifiableCredentialJwt(
        vcVisaPayload,
        issuer
    );

    // delete designated user's visa request form
    await query.deleteRow(
        'GOVERN_FA_VISA_SURVEY',
        'visa_survey_id',
        visa_survey_id,
        (err: any, data: any) => {
            if (err) {
                console.log('ERROR : ', err);
                res.status(400).send(err);
            }
            console.log(data);
        }
    );

    res.status(200).send({
        data: { vcVisaJwt: vcVisaJwt },
        msg: 'get passport vc success',
    });
};

export const test = async (req: Request, res: Response) => {
    const { vcJwt } = req.body;
    // console.log(vcJwt);
    const issuer: any = await createIssuerDID();
    const vpPayload: JwtPresentationPayload = {
        vp: {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: ['VerifiablePresentation'],
            verifiableCredential: [vcJwt],
        },
    };
    const vpJwt = await createVerifiablePresentationJwt(vpPayload, issuer);
    console.log(vpJwt);
    const providerConfig = {
        name: 'ganache',
        rpcUrl: 'http://192.168.35.214:7545',
        registry: didContractAdd,
    };
    const ethrDidResolver = await getResolver(providerConfig);
    const didResolver = await new Resolver(ethrDidResolver);
    const verifiedVP = await verifyPresentation(vpJwt, didResolver);

    return res.status(200).send({ data: { vpJwt: vpJwt } });
};
