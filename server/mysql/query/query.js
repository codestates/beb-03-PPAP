const connection = require("../config/mysql");

module.exports.getAllUser = async function getClientUser(callback) {
  connection.query("SELECT * from CLIENT_USER", function (err, result) {
    if (err) callback(err, null);
    else callback(null, result);
  });
};

module.exports.getUser = async function getClientUser(
  findFlag,
  data,
  callback
) {
  connection.query(
    `SELECT * FROM GOVERN_USER_CLIENT WHERE ${findFlag}='${data}'`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};

module.exports.checkPassReq = async function checkPassReq(data, callback) {
  connection.query(
    `SELECT * FROM GOVERN_FA_PASSPORT WHERE clientId='${data}'`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};

module.exports.getAdmin = async function getAdminUser(
  findFlag,
  data,
  callback
) {
  connection.query(
    `SELECT * FROM GOVERN_USER_ADMIN WHERE ${findFlag}='${data}'`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};
module.exports.getPassport = async function getPassportList(
  findFlag,
  data,
  callback
) {
  connection.query(
    `SELECT * FROM GOVERN_FA_PASSPORT P
    INNER JOIN GOVERN_USER_CLIENT C 
    ON P.clientId = C.id
    WHERE P.${findFlag}='${data}'`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};
module.exports.getVisaSurveyList = async function getVisaSurveyList(
  findFlag,
  data,
  callback
) {
  connection.query(
    `SELECT * FROM GOVERN_FA_VISA_SURVEY
         WHERE ${findFlag}='${data}'`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    }
  );
};

// module.exports.joinTables = async function joinTables(callback) {
//     connection.query(
//         `SELECT * FROM GOVERN_FA_PASSPORT AS P JOIN GOVERN_USER_CLIENT AS C WHERE P.clientID=C.id`,
//         function (err, result) {
//             if (err) callback(err, null);
//             else callback(null, result);
//         }
//     );
// };

module.exports.requestForm = async function requestForm(reqForm, callback) {
  this.checkPassReq(reqForm.clientId, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      if (data.length === 0) {
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
        callback(null, null);
      }
    }
  });
};
