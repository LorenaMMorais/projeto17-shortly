import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(router);

app.listen(process.env.PORT, () => {
    console.log('Servidor no ar na porta', process.env.PORT);
})