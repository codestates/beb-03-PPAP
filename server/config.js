require("dotenv").config();
const { ISSUERPUBKEY, ISSUERPRIVKEY, DIDCONTRACTADD } = process.env;

module.exports = {
  issuerPub: ISSUERPUBKEY,
  issuerPriv: ISSUERPRIVKEY,
  didContractAdd: DIDCONTRACTADD,
};
