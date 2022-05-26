const query = require("../mysql/query/query");

export const getApprovedPassportData = async (holderInfo: any) => {
  return new Promise((resolve) => {
    // designate user using did
    query.getTargetData(
      "GOVERN_FA_PASSPORT",
      "did",
      holderInfo.did,
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          resolve(data);
        }
      },
    );
  }).then(async (tempData: any) => {
    let msg: any = null;
    let statusCode: any = null;
    let realData: any = null;

    // no matching data
    if (tempData.length === 0) {
      const isPassport: any = await new Promise((resolve) => {
        query.getTargetData(
          "GOVERN_USER_CLIENT",
          "did",
          holderInfo.did,
          (err: any, data: any) => {
            if (err) {
              console.log(err);
              return err;
            } else {
              resolve(data);
            }
          },
        );
      });

      if (isPassport.length == 0) {
        // no data in passport request DB
        console.log("user doesn't have passport");
        return {
          statusCode: 400,
          data: null,
          msg: `You don't have passport yet. Submit passport request first.`,
        };
      } else {
        // no data in passport request DB, because passport VC is already issued
        console.log(
          "user already issue passport VC, and user request passport once more",
        );
        return {
          statusCode: 400,
          data: null,
          msg: `You already have passport VC.`,
        };
      }
    }

    if (tempData[0].success_yn === "0") {
      // submitted request is not approved yet
      console.log("user passport is not approved yet");
      msg = "your passport request is not approved yet.";
      statusCode = 401;
    } else if (tempData[0].success_yn === "2") {
      // submitted request is rejected
      console.log("user passport is rejected");
      msg = "your passport request is rejected";
      statusCode = 403;
    } else if (tempData[0].success_yn === "1") {
      const cond = ["client_id", "client_id"];
      const addClientData = await new Promise(async (resolve) => {
        await query.joinTable(
          "GOVERN_FA_PASSPORT",
          "GOVERN_USER_CLIENT",
          cond,
          "did",
          tempData[0].did,
          (err: any, data: any) => {
            console.log("issuing information call success");
            const tempObj = Object.assign(data[0]);
            // delete unnecessary key:value
            delete tempObj.passport_id;
            delete tempObj.success_yn;
            delete tempObj.client_id;
            resolve(tempObj);
          },
        );
      });
      realData = addClientData;
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
      "GOVERN_FA_VISA_SURVEY",
      condOption,
      (err: any, data: any) => {
        if (err) {
          console.log(err);
          return err;
        }
        resolve(data);
      },
    );
  }).then(async (tempData: any) => {
    if (tempData.length === 0) {
      console.log("user requested visa_survey_id is invalid");
      return {
        statusCode: 400,
        data: null,
        msg: `No matching visa. Check visa_survey_id`,
      };
    }
    const cond1 = ["visa_id", "visa_id"];
    const realData: any = await new Promise(async (resolve) => {
      // designate user using visa_survey_id
      // detailed visa information should be displayed
      await query.joinTable(
        "GOVERN_FA_VISA_SURVEY",
        "GOVERN_FA_VISA",
        cond1,
        "visa_survey_id",
        reqVisaInfo.visa_survey_id,
        async (err: any, data1: any) => {
          if (err) {
            console.log(err);
            return err;
          }
          if (data1[0].success_yn === "0") {
            resolve({
              statusCode: 400,
              data: null,
              msg: `Your visa request is not approved yet.`,
            });
          } else {
            const cond2 = ["did", "did"];
            // detailed user information also be displayed
            await query.joinTable(
              "GOVERN_FA_VISA_SURVEY",
              "GOVERN_USER_CLIENT",
              cond2,
              "did",
              data1[0].did,
              (err: any, data2: any) => {
                if (err) {
                  console.log(err);
                  return err;
                }
                const tempObj1 = Object.assign(data2[0]);
                const countryObj1 = {
                  user_country_code: tempObj1.country_code,
                };
                // delete unnecessary key:value
                delete tempObj1.country_code;
                const tempObj2 = Object.assign(data1[0], tempObj1);
                const countryObj2 = {
                  target_country_code: tempObj2.country_code,
                };
                // delete unnecessary key:value
                delete tempObj2.country_code;
                delete tempObj2.visa_id;
                delete tempObj2.success_yn;
                delete tempObj2.visa_survey_id;
                delete tempObj2.client_id;
                delete tempObj2.phone_num;
                delete tempObj2.personal_id;
                const tempObj3 = Object.assign(
                  tempObj2,
                  countryObj1,
                  countryObj2,
                );
                resolve(tempObj3);
              },
            );
          }
        },
      );
    });
    return realData;
  });
};
