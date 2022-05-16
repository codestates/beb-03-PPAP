const connection = require("../config/mysql");

module.exports.getUser = async function getUser(
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
module.exports.getUserMultiCond = async function getUserMultiCond(
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

module.exports.getPassportForStamp = async function getPassportForStamp(
  holder_did,
  callback
) {
  connection.query(
    `SELECT * FROM GOVERN_FA_PASSPORT P
    INNER JOIN GOVERN_USER_CLIENT C 
    ON P.client_id = C.client_id 
    WHERE P.did = "${holder_did}"`,
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
    INNER JOIN GOVERN_FA_PASSPORT P
    ON V.passport_id = P.passport_id
    INNER JOIN GOVERN_USER_CLIENT C 
    ON P.client_id = C.client_id
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
  entOrdep,
  countryCode,
  callback
) {
  connection.query(
    `SELECT * FROM GOVERN_FA_STAMP S
    INNER JOIN GOVERN_FA_PASSPORT P
    ON P.passport_id = S.passport_id
    INNER JOIN GOVERN_USER_CLIENT C
    ON P.client_id = C.client_id
    WHERE S.ent_or_dep = "${entOrdep}" AND S.country_code = "${countryCode}"`, // 출입국중 하나만, 국가조회?
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};

// stamp table 업데이트 쿼리
module.exports.updateStampTable = async function updateStampTable(
  passport_id,
  stamp_uri,
  country_code,
  stamp_expired_date,
  callback
) {
  connection.query(
    `UPDATE GOVERN_FA_STAMP
    SET passport_id = '${passport_id}', stamp_uri = '${stamp_uri}', country_code = ${country_code}, stamp_expired_date = ${stamp_expired_date}
    `,
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
  // find user using id(clientId)
  this.getUser(
    "GOVERN_FA_PASSPORT",
    "client_id",
    reqForm.client_id,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.length === 0) {
          // none request -> newly transfer
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
          // request already exists
          callback(null, data[0].success_yn);
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
    `SELECT * FROM GOVERN_FA_VISA_SURVEY WHERE passport_id='${reqForm.passport_id}' AND visa_id='${reqForm.visa_id}'`,
    reqForm.client_id,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.length === 0) {
          // none request -> newly transfer
          connection.query(
            `INSERT INTO GOVERN_FA_VISA_SURVEY (passport_id, visa_id, success_yn) VALUES ('${
              reqForm.passport_id
            }','${reqForm.visa_id}','${0}')`,
            function (err, result) {
              if (err) callback(err, null);
              else callback(null, result);
            }
          );
        } else {
          // request already exists
          callback(null, null);
        }
      }
    }
  );
};

// module.exports.joinTable = async function joinTables(
//     tableFlag,
//     joinTable,
//     cond,
//     data,
//     callback
// ) {
//     let queryMsg = `SELECT * FROM ${tableFlag} INNER JOIN ${joinTable} ON ${tableFlag}.${cond[0]} = ${joinTable}.${cond[1]} WHERE ${tableFlag}.${cond[0]} = '${data}'`;

//     connection.query(queryMsg, function (err, result) {
//         if (err) callback(err, null);
//         else callback(null, result);
//     });
// };
