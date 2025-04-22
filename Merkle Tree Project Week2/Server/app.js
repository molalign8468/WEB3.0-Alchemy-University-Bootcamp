const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

let MERKLE_ROOT = "";

app.post("/gift", (req, res) => {
  const body = req.body;
  MERKLE_ROOT = body.root;
  const isInTheList = verifyProof(body.proof, body.name, body.root);

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
