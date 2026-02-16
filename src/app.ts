import express from 'express';
import userRoutes from './routes/user.route';
import taskRoutes from './routes/task.routes';
import commentRoutes from './routes/comment.routes';
import projectRoutes from './routes/project.routes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

app.use('/tasks', taskRoutes);

app.use('/projects', projectRoutes) ;

app.use('/comments', commentRoutes);

app.get('/', (req, res) => res.send('Health check'));

export default app;
