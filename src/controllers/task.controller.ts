import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import logger from '../utils/logging';

const taskService = new TaskService();

export const getTask = async (req: Request, res: Response) => {

try {
  const id = Number(req.body.id);

  const task = await taskService.getTask(id);

  if (!task) {

    logger.error("getTask error:500")

    return res.status(500).json({ message: 'Task not found' })

  }

  res.json(task);
} catch (error) {

  logger.error("Internal server error")

  return res.status(500).json({ message: "Server error" , error})
  
}
};

export const createTask = async (req: Request, res: Response) => {

try {
  const { name, description, projectID, status } = req.body;

  const task = await taskService.createTask(name, description, projectID, status);

  if (!task) {

    logger.error("createTask error:500")

    return res.status(500).json({ success: false })

  }

  res.status(201).json(task);
} catch (error) {

  logger.error("Internal server error")

  return res.status(500).json({ message: "Server error" , error})
  
}
  
};
