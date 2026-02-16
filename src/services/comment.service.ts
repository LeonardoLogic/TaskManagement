import { CommentRepository } from "../repositories/comment.repository";

export class CommentService {

  private commentRepository = new CommentRepository();

  async getComments(tasdID: number) {

    return this.commentRepository.getComments(tasdID);

  }

  async createComment(taskID: number, comment: string) {

    return this.commentRepository.createComment({ taskID, comment});

  }

}
