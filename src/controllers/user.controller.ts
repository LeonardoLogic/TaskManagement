import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import logger from '../utils/logging';

export const getUser = (userService = new UserService()) => async (req: Request, res: Response) => {
  try {
    const id = Number(req.body.id); 

    const user = await userService.getUser(id);

    if (!user) {

      logger.error("GetUser error:500");

      return res.status(500).json({ success: false });

    }

    res.status(200).json(user);
  } catch (error) {

    logger.error("Internal server error");
    
    return res.status(500).json({ message: "Server error", error });

  }
};

export const createUser = (userService = new UserService()) => async (req: Request, res: Response) => {

  try {

    const { username, email , password } = req.body;

    const user = await userService.createUser(username, email, password);
    
    if (!user) {

      logger.error("createUser error:500")

      return res.status(500).json({ success: false })

    }

    res.status(201).json(user);
  } catch (error) {

    logger.error("Internal server error")

    return res.status(500).json({ message: "Server error" , error})
    
  }

};

export const userLogin = (userService = new UserService()) => async (req: Request, res: Response ) => {

  try {
    const { email, password } = req.body;

    const loggedIn = await userService.Login(email,password);

    if (!loggedIn) {

      logger.error("Login error:500")

      return res.status(500).json({ success: false })

    }

    res.status(200).json(loggedIn);

  } catch (error) {

    logger.error("Internal server error")

    return res.status(500).json({ message: "Server error" , error})
    
  }
}
