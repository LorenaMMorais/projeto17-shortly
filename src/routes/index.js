import { Router } from 'express';
import authRouter from './authRouter';
import urlsRouter from './urlsRouter';
import usersRouter from './usersRouter';

const router = Router();

router.use(authRouter);
router.use(urlsRouter);
router.use(usersRouter);

export default router;