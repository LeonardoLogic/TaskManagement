import MySQL from '../db/mysql';
import Redis from '../db/redis';

export class TaskRepository {
  private mysql = MySQL.getInstance();
  private redis = Redis.getInstance();

  async getTask(id: number) {

try {

    const cacheKey = `task:${id}`;

    const cached = await this.redis.get(cacheKey);

    if (cached) {

      return JSON.parse(cached);

    }

    const [rows] = await this.mysql.query('SELECT * FROM tasks WHERE id = ?', [id]);

    const task = Array.isArray(rows) ? rows[0] : null;

    if (task) await this.redis.set(cacheKey, JSON.stringify(task), { EX: 3600 });

    return task;
  
} catch (error) {

  return null ;
  
}

  }

  async createTask(task: { name: string; description: string; projectID: number, status: string}) {

try {

  const [result]: any = await this.mysql.execute('INSERT INTO tasks (name, description, projectID, status) VALUES (?, ?, ?, ?)', [task.name, task.description, task.projectID, task.status]);

  return { id: result.insertId, ...task };
  
} catch (error) {

  return null;
  
}

  }

}
