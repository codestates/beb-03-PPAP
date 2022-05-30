require('dotenv').config();
const {
    ISSUERPUBKEY,
    ISSUERPRIVKEY,
    DIDCONTRACTADD,
    ISSUERDID,
    ACCESS_TOKEN_SECRET,
    HASHROUND,
} = process.env;

module.exports = {
    issuerPub: ISSUERPUBKEY,
    issuerPriv: ISSUERPRIVKEY,
    didContractAdd: DIDCONTRACTADD,
    issuerDid: ISSUERDID,
    accessTokenSecret: ACCESS_TOKEN_SECRET,
    hashRound: HASHROUND,
};
