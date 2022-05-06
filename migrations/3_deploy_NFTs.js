const fs = require("fs");

const NFTs = artifacts.require("NFTs");

module.exports = function (deployer) {
  deployer.deploy(NFTs).then(() => {
    console.log("deploy...");
    if (NFTs._json) {
      fs.writeFileSync("ABI", JSON.stringify(NFTs._json.abi), (err) => {
        if (err) {
          console.log(err);
        }
        console.log("ABI Success");
      });

      fs.writeFileSync("address", NFTs.address, (err) => {
        if (err) throw err;
        console.log("Address Success");
      });
    }
  });
};
