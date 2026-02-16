import { Router } from 'express';
import { getUser, createUser, userLogin } from '../controllers/user.controller';

const router = Router();

router.get('/getUser', getUser);

router.post('/createUser', createUser); 

router.post('/userLogIn', userLogin);

export default router;
