import { Router } from 'express';
import {postUrl, urlById, openUrl, deleteUrl} from '../controllers/urlsController.js';
import {validateUrl, validateHeader, existUrl} from '../middlewares/validationsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', validateUrl, validateHeader, postUrl);
urlsRouter.get('/urls/:shortUrl', existUrl, urlById);
urlsRouter.get('/urls/open/:shortUrl', existUrl, openUrl);
urlsRouter.delete('/urls/:shortUrl', validateHeader, existUrl, deleteUrl);

export default urlsRouter;