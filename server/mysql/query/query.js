const connection = require("../config/mysql");

module.exports.getUser = async function getUser(
  tableFlag,
  findFlag,
  data,
  callback
) {
  connection.query(
    `SELECT * FROM ${tableFlag} WHERE ${findFlag}='${data}'`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};

module.exports.getPassport = async function getPassportList(
  findFlag,
  data,
  countryCode,
  callback
) {
  connection.query(
    `SELECT * FROM GOVERN_FA_PASSPORT P
    INNER JOIN GOVERN_USER_CLIENT C 
    ON P.clientId = C.id 
    WHERE C.countryCode = "${countryCode}" AND P.${findFlag}=${data}`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};
module.exports.getVisaSurveyList = async function getVisaSurveyList(
  findFlag,
  data,
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
    ON P.clientId = C.id
    WHERE V.${findFlag}='${data}' AND FV.countryCode = "${countryCode}"`,
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

module.exports.requestForm = async function requestForm(reqForm, callback) {
  // find user using id(clientId)
  this.getUser("GOVERN_FA_PASSPORT", "id", reqForm.clientId, (err, data) => {
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
  });
};
