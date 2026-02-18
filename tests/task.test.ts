import request from 'supertest';
import express from 'express'
import { TaskService } from '../src/services/task.service';
import { getTask } from '../src/controllers/task.controller';

describe('GET /tasks/getTask', () => {

    it('should return task data if task exists', async() => {

        const mockTask = {id: 1, taskID: 1, name: 'Test', description: "Testing", projectID: 1, status: 'active'}

        const mockTaskService = {
            getTask: jest.fn().mockResolvedValue(mockTask)
        } as unknown as TaskService

        const app = express();
        app.use(express.json())

        app.get('/tasks/getTask', getTask(mockTaskService))

        const res = await request(app)
            .get('/tasks/getTask')
            .send({ id: 1})

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockTask);

    })

})