const connection = require('../config/mysql');

module.exports.getClientUser = async function getClientUser(callback) {
    connection.query(
        'SELECT * from GOVERN_FA_PASSPORT',
        function (err, result) {
            if (err) callback(err, null);
            else callback(null, result);
        }
    );
};
