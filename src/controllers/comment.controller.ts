import { Request, Response } from 'express';
import { CommentService } from '../services/comment.service';
import logger from '../utils/logging';

const commentService = new CommentService();

export const getComments = async (req: Request, res: Response) => {

try {

  const id = Number(req.body.id);

  const comment = await commentService.getComments(id);

  if (!comment) {

    logger.error("getComments error:500")

    return res.status(500).json({ message: 'Comment not found' })

  }

  res.json(comment);

} catch (error) {

  logger.error("Internal server error")
  
  return res.status(500).json({ message: "Server error" , error})


}

};

export const createComment = async (req: Request, res: Response) => {

try {

  const { taskID, comment } = req.body;

  const task = await commentService.createComment(taskID, comment );

  if (!task) {

    logger.error("createComment error:500")

    return res.status(500).json({ success: false })

  }

  res.status(201).json(task);
  
} catch (error) {

  logger.error("Internal server error")
  
  return res.status(500).json({ message: "Server error" , error})

}
  
};
