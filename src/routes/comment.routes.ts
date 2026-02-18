import { Router } from 'express';
import { createComment, getComments } from '../controllers/comment.controller';


const router = Router();

router.get('/getTaskComments', getComments());

router.post('/createComment', createComment());

export default router;
