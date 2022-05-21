const query = require('../mysql/query/query');

export const getApprovedPassportData = async (holderInfo: any) => {
    return new Promise((resolve) => {
        // designate user using did
        query.getTargetData(
            'GOVERN_FA_PASSPORT',
            'did',
            holderInfo.did,
            (err: any, data: any) => {
                if (err) {
                    console.log(err);
                    return err;
                } else {
                    resolve(data);
                }
            }
        );
    }).then(async (tempData: any) => {
        let msg: any = null;
        let statusCode: any = null;
        let realData: any = null;

        // no matching data
        if (tempData.length === 0) {
            const isPassport: any = await new Promise((resolve) => {
                query.getTargetData(
                    'GOVERN_USER_CLIENT',
                    'did',
                    holderInfo.did,
                    (err: any, data: any) => {
                        if (err) {
                            console.log(err);
                            return err;
                        } else {
                            resolve(data);
                        }
                    }
                );
            });

            if (isPassport.length == 0) {
                // no data in passport request DB
                return {
                    statusCode: 400,
                    data: null,
                    msg: `You don't have passport yet. Submit passport request first.`,
                };
            } else {
                // no data in passport request DB, because passport VC is already issued
                return {
                    statusCode: 400,
                    data: null,
                    msg: `You already have passport VC.`,
                };
            }
        }

        if (tempData[0].success_yn === '0') {
            // submitted request is not approved yet
            msg = 'your passport request is not approved yet.';
            statusCode = 401;
        } else if (tempData[0].success_yn === '2') {
            // submitted request is rejected
            msg = 'your passport request is rejected';
            statusCode = 403;
        } else if (tempData[0].success_yn === '1') {
            realData = tempData;
        }

        return {
            statusCode: statusCode,
            data: realData,
            msg: msg,
        };
    });
};

export const getApprovedVisaData = async (reqVisaInfo: any) => {
    const condOption = {
        did: reqVisaInfo.did,
        visa_survey_id: reqVisaInfo.visa_survey_id,
    };
    return new Promise((resolve) => {
        // search user's visa requset via input visa_survey_id
        query.getMultiCondData(
            'GOVERN_FA_VISA_SURVEY',
            condOption,
            (err: any, data: any) => {
                if (err) {
                    console.log(err);
                    return err;
                }
                resolve(data);
            }
        );
    }).then(async (tempData: any) => {
        if (tempData.length === 0) {
            return {
                statusCode: 400,
                data: null,
                msg: `No matching visa. Check visa_survey_id`,
            };
        }
        const cond = ['visa_id', 'visa_id'];
        const realData: any = await new Promise(async (resolve) => {
            // designate user using visa_survey_id
            await query.joinTable(
                'GOVERN_FA_VISA_SURVEY',
                'GOVERN_FA_VISA',
                cond,
                'visa_survey_id',
                reqVisaInfo.visa_survey_id,
                (err: any, data: any) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                    if (data[0].success_yn === '0') {
                        resolve({
                            statusCode: 400,
                            data: null,
                            msg: `Your visa request is not approved yet.`,
                        });
                    }
                    const tempObj = Object.assign(data[0]);
                    // delete unnecessary key:value
                    delete tempObj.visa_id;
                    delete tempObj.success_yn;
                    delete tempObj.visa_survey_id;
                    resolve(tempObj);
                }
            );
        });
        return realData;
    });
};
