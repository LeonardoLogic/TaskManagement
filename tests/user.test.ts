import request from 'supertest';
import express from 'express';
import { createUser, getUser } from '../src/controllers/user.controller';
import { UserService } from '../src/services/user.service';

describe('GET /users/getUser', () => {
  it('should return user data if user exists', async () => {
    
    const mockUser = { id: 1, username: 'test', email: 'test@example.com' };
    const mockUserService = {
      getUser: jest.fn().mockResolvedValue(mockUser)
} as unknown as UserService;

    const app = express();
    app.use(express.json());

    app.get('/users/getUser', getUser(mockUserService));

    const res = await request(app)
      .get('/users/getUser')
      .send({ id: 1 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUser);
  });
  
});

describe('POST /users/createUser', () => {
  it('should create a user and return 201', async () => {
    const mockUser = { id: 1, username: 'test', email: 'test@example.com', password: 'hashed' };
    const mockUserService = {
      createUser: jest.fn().mockResolvedValue(mockUser)
    } as unknown as UserService;

    const app = express();
    app.use(express.json());

    app.post('/users/createUser', createUser(mockUserService));

    const res = await request(app)
      .post('/users/createUser')
      .send({ username: 'test', email: 'test@example.com', password: 'password' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(mockUser);
    expect(mockUserService.createUser).toHaveBeenCalledWith('test', 'test@example.com', 'password');
  });

  it('should return 500 if user creation fails', async () => {
    const mockUserService = {
      createUser: jest.fn().mockResolvedValue(null)
    } as unknown as UserService;

    const app = express();
    app.use(express.json());
    
    app.post('/users/createUser', createUser(mockUserService));

    const res = await request(app)
      .post('/users/createUser')
      .send({ username: 'fail', email: 'fail@example.com', password: 'password' });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ success: false });
  });
});