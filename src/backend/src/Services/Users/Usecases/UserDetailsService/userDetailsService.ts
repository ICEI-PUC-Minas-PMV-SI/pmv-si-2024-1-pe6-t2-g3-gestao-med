import { CustomError } from "../../../../errors/custom.error";
import prismaClient from "../../../../prisma";
import { IUsersRepository } from "../../Repositories/users.repository";

class UserDetailsService {

  constructor(
    private userRepository: IUsersRepository
  ){}
  
  async execute(user_id: string) {
    if (!user_id) throw new CustomError("UserId is required!", 400);

    const user = await this.userRepository.findById(user_id)

    if (!user) throw new CustomError("User not found!", 404);

    return user;
  }
}

export { UserDetailsService };
