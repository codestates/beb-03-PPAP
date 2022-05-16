const query = require('../mysql/query/query');

export const getOnlyPassport = async (clientInfo: any) => {
    return new Promise((resolve) => {
        console.log(clientInfo);
        query.getUser(
            'GOVERN_FA_PASSPORT',
            'did',
            clientInfo.did,
            (err: any, data: any) => {
                if (err) {
                    console.log(err);
                    return err;
                } else {
                    resolve(data);
                }
            }
        );
    }).then((tempData: any) => {
        let msg: any = null;
        let statusCode: any = null;
        let realData: any = null;
        if (tempData.length === 0) {
            // no data in passport DB
            return {
                statusCode: 401,
                data: null,
                msg: `You don't have passport yet. Submit passport request first.`,
            };
        }
        if (tempData[0].success_yn === '0') {
            // submitted request is not approved yet
            msg = 'your passport request is not approved yet.';
            statusCode = 401;
        } else if (tempData[0].success_yn === '2') {
            // submitted request is not approved yet
            msg = 'your passport request is rejected';
            statusCode = 401;
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
