const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

const instatntMarkrl = new MerkleTree(niceList);
const root = instatntMarkrl.getRoot();

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  const name = "Molalign Getahun";
  const index = niceList.findIndex((n) => n === name);
  const proof = instatntMarkrl.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name,
    root,
  });
  console.log(instatntMarkrl.getRoot());

  console.log({ gift });
}

main();
