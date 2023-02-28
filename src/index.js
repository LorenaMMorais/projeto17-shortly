import express, {json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.listen(process.env.PORT, () => {
    console.log('Servidor no ar na porta', process.env.PORT);
})