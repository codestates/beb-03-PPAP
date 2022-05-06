export const verifyPassport = async (req, res) => {
    const { test } = req.body;
    const msg = `test post method verifyPassport : ${test}`;
    console.log(msg);
    res.send({ msg: msg });
};

export const verifyVisa = async (req, res) => {
    const { test } = req.body;
    const msg = `test post method verifyVisa : ${test}`;
    console.log(msg);
    res.send({ msg: msg });
};

export const mintStampNFT = async (req, res) => {
    const { test } = req.body;
    const msg = `test post method mintStampNFT : ${test}`;
    console.log(msg);
    res.send({ msg: msg });
};
