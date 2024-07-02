import { CustomError } from "../../../../errors/custom.error";
import { IUsersRepository } from "../../../Users/Repositories/users.repository";
import { IRegistersRepository } from "../../Repositories/registers.repository";

class FindByUserService {
    constructor(
        private registerRepository: IRegistersRepository,
        private usersRepository: IUsersRepository) { }

    async execute(user_id: string, start_date: Date, end_date: Date) {

        if (!user_id || !start_date || !end_date) throw new CustomError("Missing data", 400)

        const findRegisters = await this.registerRepository.findByUserIdInPeriod(user_id, start_date, end_date)

        if (!findRegisters) throw new CustomError("Register not found")

        return findRegisters
    }
}

export { FindByUserService }