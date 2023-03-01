import { Router } from 'express';
import {postUrl, urlById, openUrl, deleteUrl} from '../controllers/urlsController.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', postUrl);
urlsRouter.get('/urls/:id', urlById);
urlsRouter.get('/urls/open/:shortUrl', openUrl);
urlsRouter.delete('/urls/:id', deleteUrl);

export default urlsRouter;