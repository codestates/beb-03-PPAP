export const getPassport = async (req, res) => {
    const msg = `test get method getPassport`;
    console.log(msg);
    res.send({ msg: msg });
};

export const authPassport = async (req, res) => {
    const msg = `test get method authPassport`;
    console.log(msg);
    res.send({ msg: msg });
};

export const requestPassport = async (req, res) => {
    const { test } = req.body;
    const msg = `test post method requestPassport : ${test}`;
    console.log(msg);
    res.send({ msg: msg });
};

export const makePassport = async (req, res) => {
    const { test } = req.body;
    const msg = `test post method makePassport : ${test}`;
    console.log(msg);
    res.send({ msg: msg });
};

export const requestVisa = async (req, res) => {
    const { test } = req.body;
    const msg = `test post method requestVisa : ${test}`;
    console.log(msg);
    res.send({ msg: msg });
};

export const makeVisa = async (req, res) => {
    const { test } = req.body;
    const msg = `test post method makeVisa : ${test}`;
    console.log(msg);
    res.send({ msg: msg });
};
