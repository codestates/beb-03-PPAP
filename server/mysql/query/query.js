const connection = require("../config/mysql");

module.exports.getAllData = async function getAllData(tableFlag, callback) {
  connection.query(`SELECT * from ${tableFlag}`, function (err, result) {
    if (err) callback(err, null);
    else callback(null, result);
  });
};

module.exports.getTargetData = async function getTargetData(
  tableFlag,
  findFlag,
  data,
  callback
) {
  const queryMsg = `SELECT * FROM ${tableFlag} WHERE ${findFlag}='${data}'`;
  connection.query(queryMsg, function (err, result) {
    if (err) callback(err, null);
    else callback(null, result);
  });
};

// query using multiple condition
module.exports.getMultiCondData = async function getMultiCondData(
  tableFlag,
  findCond,
  callback
) {
  let queryMsg = `SELECT * FROM ${tableFlag} `;
  Object.entries(findCond).forEach(([findFlag, data], idx) => {
    if (idx === 0) {
      queryMsg += "WHERE ";
    } else {
      queryMsg += "AND ";
    }
    queryMsg += `${findFlag}='${data}' `;
  });

  connection.query(queryMsg, function (err, result) {
    if (err) callback(err, null);
    else callback(null, result);
  });
};

module.exports.getPassport = async function getPassportList(
  countryCode,
  callback
) {
  connection.query(
    `SELECT * FROM GOVERN_FA_PASSPORT P
    INNER JOIN GOVERN_USER_CLIENT C 
    ON P.client_id = C.client_id 
    WHERE C.country_code = "${countryCode}"`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};

module.exports.getUserByDid = async function getUserByDid(
  holder_did,
  callback
) {
  connection.query(
    `SELECT * FROM GOVERN_USER_CLIENT C 
    WHERE C.did = "${holder_did}"`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};

module.exports.getVisaSurveyList = async function getVisaSurveyList(
  countryCode,
  callback
) {
  connection.query(
    `SELECT *,V.success_yn AS visa_success_yn FROM GOVERN_FA_VISA FV
    INNER JOIN GOVERN_FA_VISA_SURVEY V
    ON V.visa_id = FV.visa_id
    INNER JOIN GOVERN_USER_CLIENT C 
    ON C.did = V.did
    WHERE FV.country_code = "${countryCode}"`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};

// 비자, 여권 successyn코드 수정하는 쿼리
module.exports.updateRequest = async function updateRequest(
  tableFlag,
  updateFlag,
  updateData,
  findFlag,
  findData,
  callback
) {
  connection.query(
    `UPDATE ${tableFlag}
    SET ${updateFlag} = '${updateData}'
    WHERE ${findFlag} = ${findData} AND ${updateFlag} = "0"`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};

module.exports.getUserStamp = async function getUserStamp(
  entOrdep, // 0 : 전체 ,1 : 입국,2 : 출국
  countryCode,
  callback
) {
  // 조건
  let queryStr = `SELECT * FROM GOVERN_FA_STAMP S
  INNER JOIN GOVERN_FA_PASSPORT P
  ON P.passport_id = S.passport_id
  INNER JOIN GOVERN_USER_CLIENT C
  ON P.client_id = C.client_id`;

  switch (entOrdep) {
    case "0":
      queryStr += `\n WHERE S.country_code = "${countryCode}"`;
      break;
    case "1":
      queryStr += `\n WHERE S.ent_or_dep = "ent" AND S.country_code = "${countryCode}"`;
      break;
    case "2":
      queryStr += `\n WHERE S.ent_or_dep = "dep" AND S.country_code = "${countryCode}"`;
      break;
    default:
      queryStr = " ";
  }
  await connection.query(queryStr, function (err, result) {
    if (err) callback(err, null);
    else callback(null, result);
  });
};

// stamp table 업데이트 쿼리
module.exports.updateStampTable = async function updateStampTable(
  passport_id,
  stamp_uri,
  country_code,
  stamp_expired_date,
  ent_or_dep,
  callback
) {
  connection.query(
    `INSERT INTO GOVERN_FA_STAMP (passport_id, stamp_uri, country_code, stamp_expired_date, ent_or_dep)
    VALUES ('${passport_id}','${stamp_uri}',"${country_code}","${stamp_expired_date}","${ent_or_dep}")`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};

module.exports.requestPassForm = async function requestPassForm(
  reqForm,
  callback
) {
  console.log(reqForm.did);
  // find user using id(clientId)
  this.getTargetData(
    "GOVERN_FA_PASSPORT",
    "client_id",
    reqForm.client_id,
    async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.length === 0) {
          const condOption = {
            did: reqForm.did,
            user_name: reqForm.user_name,
          };

          const isPassport = await new Promise((resolve) => {
            this.getMultiCondData(
              "GOVERN_USER_CLIENT",
              condOption,
              (err, data) => {
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
            // none request and empty did -> newly transfer
            connection.query(
              `INSERT INTO GOVERN_FA_PASSPORT (client_id, did, photo_uri, success_yn) VALUES ('${
                reqForm.client_id
              }','${reqForm.did}','${reqForm.photo_uri}','${0}')`,
              function (err, result) {
                if (err) callback(err, null);
                else callback(null, result);
              }
            );
          } else {
            // none request but did exist -> already have did
            callback(null, null);
          }
        } else {
          // request already exists
          callback(null, data[0]);
        }
      }
    }
  );
};

module.exports.requestVisaForm = async function requestVisaForm(
  reqForm,
  callback
) {
  // find visa request
  connection.query(
    `SELECT * FROM GOVERN_FA_VISA_SURVEY WHERE did='${reqForm.did}' AND visa_id='${reqForm.visa_id}'`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.length === 0) {
          // none request -> newly transfer
          connection.query(
            `INSERT INTO GOVERN_FA_VISA_SURVEY (did, visa_id, success_yn) VALUES ('${
              reqForm.did
            }','${reqForm.visa_id}','${0}')`,
            function (err, result) {
              if (err) callback(err, null);
              else callback(null, result);
            }
          );
        } else {
          // request already exists
          callback(null, data[0]);
        }
      }
    }
  );
};

module.exports.deleteRow = async function deleteRow(
  tableFlag,
  findFlag,
  data,
  callback
) {
  const queryMsg = `DELETE FROM ${tableFlag} WHERE ${findFlag} = '${data}'`;
  connection.query(queryMsg, function (err, result) {
    if (err) callback(err, null);
    else callback(null, result);
  });
};

module.exports.updateRow = async function updateRow(
  tableFlag,
  updateCond,
  callback
) {
  let queryMsg = `UPDATE ${tableFlag} SET ${updateCond.setCond}='${updateCond.setVal}' WHERE ${updateCond.findCond} = '${updateCond.findVal}'`;
  connection.query(queryMsg, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (err) callback(err, null);
      else callback(null, result);
    }
  });
};

module.exports.joinTable = async function joinTables(
  tableFlag,
  joinTable,
  cond,
  findFlag,
  data,
  callback
) {
  let queryMsg = `SELECT * FROM ${tableFlag} INNER JOIN ${joinTable} ON ${tableFlag}.${cond[0]} = ${joinTable}.${cond[1]} WHERE ${tableFlag}.${findFlag} = '${data}'`;

  connection.query(queryMsg, function (err, result) {
    if (err) callback(err, null);
    else callback(null, result);
  });
};
