import {Router} from 'express';
import {signUp, signIn} from '../controllers/authController.js';
import {validateUser} from '../middlewares/validationsMiddleware.js';

const authRouter = Router();

authRouter.post('/signup',validateUser, signUp);
authRouter.post('/signin',signIn);

export default authRouter;