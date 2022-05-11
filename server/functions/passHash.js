// For producing hashed password on given admin account
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

// input your password below
const password = 'dummy';

async function hashIt() {
    const salt = await bcrypt.genSalt(Number(process.env.HASHROUND));
    const hashed = await bcrypt.hash(password, salt);
    // Check hashed password on your console
    console.log(hashed);
}
hashIt();
