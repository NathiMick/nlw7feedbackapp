import express from 'express';
import nodemailer from "nodemailer"
import { routes } from './routes';
import cors from 'cors';

const app = express();

app
.use(cors())
.use(express.json())
.use(routes)


.listen(process.env.PORT || 3333, () => {
    console.log('Server started on port 3333');
});
