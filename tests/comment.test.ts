import request from 'supertest';
import express from 'express';
import { CommentService } from '../src/services/comment.service';
import { getComments } from '../src/controllers/comment.controller';

describe('GET /comments/getTaskComments', () => {

    it('should return data if comment exists', async() => {

        const mockComment = [{ id:1, comment: "test", taskID:1}]
        const mockCommentService = {
            getComments: jest.fn().mockResolvedValue(mockComment)
        } as unknown as CommentService;

        const app = express();
        app.use(express.json());

        app.get('/comments/getTaskComments', getComments(mockCommentService))

        const res = await request(app)
            .get("/comments/getTaskComments")
            .send({ id: 1 })

        expect(res.status).toBe(200);
        expect(res.body).toEqual( mockComment);

    })
    
})