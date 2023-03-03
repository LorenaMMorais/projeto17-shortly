import { Router } from "express";
import {getUser, getRanking} from '../controllers/usersController.js';
import {validateHeader} from '../middlewares/validationsMiddleware.js';

const usersRouter = Router();

usersRouter.get('/users/:id', validateHeader, getUser);
usersRouter.get('/ranking', getRanking);

export default usersRouter;