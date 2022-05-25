
const {create} = require("ipfs-http-client")
const fs = require("fs")
const path = require("path")
const createIPFS = async () => {
  try {
    const Korea = fs.readFileSync("../countryUrl/America.png");
    const client = create("https://ipfs.infura.io:5001/api/v0");
    const cid = await client.add(Korea);
    const url = `https://ipfs.infura.io/ipfs/${cid.path}`;
    console.log(url);
    return url;
  } catch (e) {
    console.log(e);
  }
};

createIPFS();

