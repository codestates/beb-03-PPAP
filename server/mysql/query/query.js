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

module.exports.getVisaSurveyList = async function getVisaSurveyList(
  countryCode,
  callback
) {
  connection.query(
    `SELECT * FROM GOVERN_FA_VISA FV
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

module.exports.requestPassForm = async function requestPassForm(
  reqForm,
  callback
) {
  // find user using id(clientId)
  this.getUser(
    "GOVERN_FA_PASSPORT",
    "clientId",
    reqForm.clientId,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.length === 0) {
          // none request -> newly transfer
          connection.query(
            `INSERT INTO GOVERN_FA_PASSPORT (clientId, did, photoURI, successyn) VALUES ('${
              reqForm.clientId
            }','${reqForm.did}','${reqForm.photoURI}','${0}')`,
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

module.exports.requestVisaForm = async function requestVisaForm(
  reqForm,
  callback
) {
  // find visa request
  connection.query(
    `SELECT * FROM GOVERN_FA_VISA_SURVEY WHERE passport_id='${reqForm.passport_id}' AND visa_id='${reqForm.visa_id}'`,
    reqForm.clientId,
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
