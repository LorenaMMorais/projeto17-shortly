import { Router } from 'express';
import {postUrl, urlById, openUrl, deleteUrl} from '../controllers/urlsController.js';
import {validateUrl, validateHeader} from '../middlewares/validationsMiddleware.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', validateUrl, validateHeader, postUrl);
urlsRouter.get('/urls/:id', urlById);
urlsRouter.get('/urls/open/:shortUrl', openUrl);
urlsRouter.delete('/urls/:id', deleteUrl);

export default urlsRouter;