import { Router } from 'express';
import { getTask, createTask } from '../controllers/task.controller';

const router = Router();

router.get('/getTask', getTask);

router.post('/createTask', createTask);

export default router;
