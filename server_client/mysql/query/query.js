const connection = require('../config/mysql');

module.exports.getAllUser = async function getClientUser(callback) {
    connection.query('SELECT * from CLIENT_USER', function (err, result) {
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
        `SELECT * FROM CLIENT_USER WHERE ${findFlag}='${data}'`,
        function (err, result) {
            if (err) callback(err, null);
            else callback(null, result);
        }
    );
};

module.exports.createUser = async function getClientUser(userData, callback) {
    this.getUser('phone_num', userData.phone_num, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data.length === 0) {
                connection.query(
                    `INSERT INTO CLIENT_USER (user_name, password, phone_num, did) VALUES ('${userData.user_name}','${userData.password}','${userData.phone_num}','${userData.did}')`,
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
