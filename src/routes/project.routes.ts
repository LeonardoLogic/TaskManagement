import { Router } from 'express';
import { createProject, getProject } from '../controllers/project.controller';


const router = Router();

router.get('/getProject', getProject());

router.post('/createProject', createProject);

export default router ;