import { ProjectRepository } from "../repositories/project.repository";

export class ProjectService {

    private projectRepository = new ProjectRepository();

    async getProject(id: number) {

        return this.projectRepository.getProject(id);

    }

    async createProject( name:string, description: string, status: string ) {

        return this.projectRepository.createProject({name, description, status})

    }

}