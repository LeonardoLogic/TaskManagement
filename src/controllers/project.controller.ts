import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";
import logger from "../utils/logging";

export const getProject = (projectService = new ProjectService()) => async (req: Request, res: Response ) => {

try {

    const id= Number(req.body.id);

    const project = await projectService.getProject(id);

    if (!project){

        logger.error("getProject error:500")

        return res.status(500).json({ message:'Project not found'})

    }

    res.status(200).json(project);

} catch (error) {

    logger.error("Internal server error")

    return res.status(500).json({ message: "Server error" , error})

}

}

export const createProject = (projectService = new ProjectService()) => async ( req: Request, res: Response) => {

try {

    const { name, description, status } = req.body ;

    const project = await projectService.createProject( name, description, status ) ;

    if (!project) {

        logger.error("createProject error:500")

        return res.status(500).json({ success: false })

    }

    res.status(200).json(project) ;

} catch (error) {

    logger.error("Internal server error")
    
    return res.status(500).json({ message: "Server error" , error})


}

}