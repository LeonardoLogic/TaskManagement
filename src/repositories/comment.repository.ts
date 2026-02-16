import MySQL from '../db/mysql';
import Redis from '../db/redis';

export class CommentRepository {
  private mysql = MySQL.getInstance();
  private redis = Redis.getInstance();

  async getComments(taskID: number) {

try {

    const cacheKey = `comments:taskID:${taskID}`;

    const cached = await this.redis.get(cacheKey);

    if (cached) {

      return JSON.parse(cached)

    };

    const [rows] = await this.mysql.query('SELECT * FROM comments WHERE taskID = ?', [taskID]);

    const comments = Array.isArray(rows) ? rows : [];

    if (comments) {

      await this.redis.set(cacheKey, JSON.stringify(comments), { EX: 3600 })

    };

    return comments;

} catch (error) {

  return null;
  
}

  }

  async createComment(comment: { taskID: number; comment: string;}) {

try {

    const [result]: any = await this.mysql.execute('INSERT INTO comments (taskID, comment) VALUES (?, ?)', [comment.taskID, comment.comment]);

    const cacheKey = `comments:taskID:${comment.taskID}`;

    await this.redis.del(cacheKey);

    return { id: result.insertId, ...comment };

} catch (error) {

  return null
  
}

  }

}
