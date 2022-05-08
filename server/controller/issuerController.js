const getPassport = async (req, res) => {
  const msg = `test get method getPassport`;
  console.log(msg);
  res.send({ msg: msg });
};

const authPassport = async (req, res) => {
  const msg = `test get method authPassport`;
  console.log(msg);
  res.send({ msg: msg });
};

const requestPassport = async (req, res) => {
  const { test } = req.body;
  const msg = `test post method requestPassport : ${test}`;
  console.log(msg);
  res.send({ msg: msg });
};

const makePassport = async (req, res) => {
  const { test } = req.body;
  const msg = `test post method makePassport : ${test}`;
  console.log(msg);
  res.send({ msg: msg });
};

const requestVisa = async (req, res) => {
  const { test } = req.body;
  const msg = `test post method requestVisa : ${test}`;
  console.log(msg);
  res.send({ msg: msg });
};

const makeVisa = async (req, res) => {
  const { test } = req.body;
  const msg = `test post method makeVisa : ${test}`;
  console.log(msg);
  res.send({ msg: msg });
};

exports.getPassport = getPassport;
exports.authPassport = authPassport;
exports.requestPassport = requestPassport;
exports.makePassport = makePassport;
exports.requestVisa = requestVisa;
exports.makeVisa = makeVisa;
