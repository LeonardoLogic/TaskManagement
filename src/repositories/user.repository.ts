import MySQL from '../db/mysql';
import Redis from '../db/redis';
import bcrypt from 'bcrypt'

export class UserRepository {
  private mysql = MySQL.getInstance();
  private redis = Redis.getInstance();

  async getUser(id: number) {
try {

  const cacheKey = `user:${id}`;

  const cached = await this.redis.get(cacheKey);

  if (cached) {

      return JSON.parse(cached);

  }

  const [rows] = await this.mysql.query('SELECT * FROM users WHERE id = ?', [id]);

  const user = Array.isArray(rows) ? rows[0] : null;

  if (user) await this.redis.set(cacheKey, JSON.stringify(user), { EX: 3600 });

  return user;
  
} catch (error) {

  return null ;
  
}

  }

  async createUser(user: { username: string; email: string , password: string}) {

    try {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(user.password, salt)

      const [result]: any = await this.mysql.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [user.username, user.email, hashedPassword]);

      return { id: result.insertId, ...user };
      
    } catch (error) {

      return null;
      
    }

  }

  async Login( user: { email: string; password: string}) {

    try {
      const [result]: any = await this.mysql.execute('SELECT password from users where email = ?', [user.email]);

      const isMatch = await bcrypt.compare( user.password, result[0].password)

      if( isMatch ) {

        return true

      }else {
      
        return false

      }

    } catch (error) {

      return null;
      
    }
    
  }

}
