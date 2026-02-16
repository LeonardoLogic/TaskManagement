import { TaskRepository } from '../repositories/task.repository';

export class TaskService {

  private taskRepository = new TaskRepository();

  async getTask(id: number) {

    return this.taskRepository.getTask(id);

  }

  async createTask(name: string, description: string, projectID: number, status: string) {

    return this.taskRepository.createTask({ name, description, projectID, status });

  }

}
