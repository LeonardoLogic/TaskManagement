import request from 'supertest';
import express from 'express';
import { ProjectService } from '../src/services/project.service';
import { getProject } from '../src/controllers/project.controller';

describe('GET projects/getProject', () => {

    it('should return project data if project exists', async() => {

        const mockProject = {id: 1, name: 'Test', status: 'active', description: 'Testing'}
        const mockProjectService = {
            getProject: jest.fn().mockResolvedValue(mockProject)
        } as unknown as ProjectService;

        const app = express();
        app.use(express.json());

        app.get('/projects/getProject', getProject(mockProjectService))

        const res = await request(app)
            .get('/projects/getProject')
            .send({ id: 1});

        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockProject)

    })

})