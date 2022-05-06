import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import issuerRoute from './routes/issuerRoute.js';
import verifierRoute from './routes/verifierRoute.js';

const app = express();

dotenv.config({ path: './.env' });

const port = 4000;

const corsOptions = { origin: `http://localhost:${port}` };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoute);
app.use('/issuer', issuerRoute);
app.use('/verifier', verifierRoute);

app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});
