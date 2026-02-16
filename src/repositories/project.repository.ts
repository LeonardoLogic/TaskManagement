import MySQL from "../db/mysql";
import Redis from "../db/redis";

export class ProjectRepository {

    private mysql = MySQL.getInstance() ;

    private redis = Redis.getInstance();

    async getProject(id: number) {

    try {

        const cacheKey = `project:${id}` ;

        const cached = await this.redis.get( cacheKey ) ;

        if ( cached ) return JSON.parse( cached ) ;

        const [ rows ] = await this.mysql.query('SELECT * FROM projects WHERE id = ?', [id] ) ;
        
        const project = Array.isArray(rows) ? rows[0] : null ;

        if ( project ) await this.redis.set(cacheKey, JSON.stringify(project), { EX: 3600 });

        return project

    } catch (error) {

        return null
        
    }

    }

    async createProject( project: { name: string; description: string, status: string } ){

    try {

        const [ result ] : any = await this.mysql.execute('INSERT INTO projects (name, description, status) VALUES(?, ?, ?)', [project.name, project.description, project.status] ) ;

        return { id: result.insertId, ...project };

    } catch (error) {

        return null
        
    }

    }
    
}