import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import router from './router/index.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use(express.json());
app.use(router);

const start = async () => {
    try {
        app.listen(process.env.PORT, () => console.log('server start'));
    } catch (e) {
        console.log(e);
    }
}

start();
