require('dotenv').config({ path: '../../.env' });
const { HOST, USERS, PASSWORD, DATABASE } = process.env;
module.exports = {
    HOST: '193.122.111.140',
    USERS: 'DID',
    PASSWORD: 'did1234',
    DATABASE: 'DID_CLIENT',
};

// host: HOST,
//     user: USERS,
//     password: PASSWORD,
//     database: DATABASE,
