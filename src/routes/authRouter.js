import {Router} from 'express';
import {signUp, signIn} from '../controllers/authController.js';
import { validateAuth } from '../middlewares/authMiddleware.js';
import {validateUser} from '../middlewares/validationsMiddleware.js';

const authRouter = Router();

authRouter.post('/signup',validateUser, validateAuth, signUp);
authRouter.post('/signin',signIn);

export default authRouter;