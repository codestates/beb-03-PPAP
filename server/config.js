require("dotenv").config();
const { ISSUERPUBKEY, ISSUERPRIVKEY, DIDCONTRACTADD, ISSUERDID } = process.env;

module.exports = {
  issuerPub: ISSUERPUBKEY,
  issuerPriv: ISSUERPRIVKEY,
  didContractAdd: DIDCONTRACTADD,
  issuerDid: ISSUERDID,
};
