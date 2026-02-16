import { UserRepository } from '../repositories/user.repository';

export class UserService {

  private userRepository = new UserRepository();

  async getUser(id: number) {

    return this.userRepository.getUser(id);
    
  }

  async createUser(username: string, email: string, password: string) {

    return this.userRepository.createUser({ username, email , password});

  }

  async Login(email:string, password: string) {

    return this.userRepository.Login({ email , password })

  }

}
