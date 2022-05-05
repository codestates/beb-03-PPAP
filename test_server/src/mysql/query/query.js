const connection = require('../config/mysql');

module.exports.getClientUser = async function getClientUser(callback){
        connection.query('SELECT * from CLIENT_USERS', function(err, result)
        {
            if (err) 
                callback(err,null);
            else
                callback(null,result);
    
        });
} 