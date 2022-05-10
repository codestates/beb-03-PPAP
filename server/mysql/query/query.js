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

module.exports.createUser = async function getClientUser(userData, callback) {
  this.getUser("phoneNum", userData.phoneNum, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data.length === 0) {
        connection.query(
          `INSERT INTO CLIENT_USER (user_name, password, phoneNum, did) VALUES ('${userData.userName}','${userData.password}','${userData.phoneNum}','${userData.did}')`,
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
