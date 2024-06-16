import { Gender } from "@prisma/client";
import { CustomError } from "../../../../errors/custom.error";
import { IUsersRepository } from "../../Repositories/users.repository";

class UpdateUserUsecase {
    constructor(
        private userRepository: IUsersRepository
    ) { }

    async execute(email: string, name: string, date_of_birth: string, gender: Gender, user_id: string) {
        if (!user_id) throw new CustomError("User id is required", 400)

        const findUser = await this.userRepository.findById(user_id)
        if (!findUser) throw new CustomError("User not found", 400)

        if (email) {
            //check if email already exists
            const findByEmail = await this.userRepository.findByEmail(email)
            if (findByEmail?.id !== user_id) throw new CustomError("Email not available", 409)

        }

        const updateUser = await this.userRepository.update(email, name, date_of_birth ? new Date(date_of_birth) : findUser.date_of_birth, gender, user_id)

        return updateUser
    }

}

export { UpdateUserUsecase }