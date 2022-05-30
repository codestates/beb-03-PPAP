const connection = require("../config/mysql");

module.exports.getUser = async function getClientUser(
  findFlag,
  data,
  callback,
) {
  connection.query(
    `SELECT * FROM CLIENT_USER WHERE ${findFlag}='${data}'`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    },
  );
};

module.exports.isPassport = async function isPassport(phoneNum, callback) {
  console.log(phoneNum);
  connection.query(
    `SELECT * FROM CLIENT_STORAGE_PASSPORT_VC WHERE phone_num="${phoneNum}"`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    },
  );
};

module.exports.createUser = async function createUser(userData, callback) {
  this.getUser("phone_num", userData.phone_num, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data.length === 0) {
        connection.query(
          `INSERT INTO CLIENT_USER (user_name, password, phone_num, did, user_birth) VALUES ('${userData.user_name}','${userData.password}','${userData.phone_num}','${userData.did}','${userData.user_birth}')`,
          function (err, result) {
            if (err) callback(err, null);
            else callback(null, result);
          },
        );
      } else {
        callback(null, null);
      }
    }
  });
};

module.exports.deleteUser = async function deleteUser(userData, callback) {
  this.getUser("phone_num", userData.phone_num, (err, data) => {
    console.log(userData.phone_num);
    if (err) {
      console.log(err);
    } else {
      if (data.length === 1) {
        connection.query(
          `DELETE FROM CLIENT_USER WHERE phone_num="${userData.phone_num}"`,
          function (err, result) {
            if (err) callback(err, null);
            else callback(null, result);
          },
        );
      } else {
        callback(null, null);
      }
    }
  });
};

module.exports.createVC = async function createVC(
  tableFlag,
  phoneNum,
  vcJwt,
  callback,
) {
  connection.query(
    `INSERT INTO ${tableFlag} (phone_num, vc_jwt) VALUES ('${phoneNum}','${vcJwt}')`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    },
  );
};
module.exports.updateVC = async function createVC(
  tableFlag,
  phoneNum,
  vcJwt,
  callback,
) {
  connection.query(
    `UPDATE ${tableFlag}
    SET vc_jwt = "${vcJwt}"    
    WHERE phone_num = "${phoneNum}";`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    },
  );
};

module.exports.getVC = async function getClientUser(
  tableFlag,
  phoneNum,
  callback,
) {
  connection.query(
    `SELECT * FROM ${tableFlag} WHERE phone_num='${phoneNum}'`,
    function (err, result) {
      if (err) callback(err, null);
      else callback(null, result);
    },
  );
};
