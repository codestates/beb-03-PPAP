export const authClient = async (req, res) => {
    const { test } = req.body;
    const msg = `test post method authClient : ${test}`;
    console.log(msg);
    res.send({ msg: msg });
};
