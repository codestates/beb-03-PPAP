const fs = require("fs");

const EthereumDIDRegistry = artifacts.require("EthereumDIDRegistry");

module.exports = function (deployer) {
  deployer.deploy(EthereumDIDRegistry).then(() => {
    console.log("deploy...");
    if (EthereumDIDRegistry._json) {
        fs.writeFileSync("ABI", JSON.stringify(EthereumDIDRegistry._json.abi), (err) => {
            if (err){
              console.log(err);
            }
            console.log("ABI Success");
        });

        fs.writeFileSync("address", EthereumDIDRegistry.address, (err) => {
            if (err) throw err;
            console.log("Address Success");
        });
    }
});
};
