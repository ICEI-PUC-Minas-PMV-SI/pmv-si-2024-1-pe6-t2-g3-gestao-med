import { UserAuthDTO, UserResponseDTO } from "../../../UserDto/user.dto";
import { IUsersRepository } from "../../users.repository";

export class UserMemoryRepository implements IUsersRepository{
    user: UserAuthDTO[] = []

    async save(data: UserAuthDTO): Promise<void> {
        this.user.push(data)
    }

    async findById(id: string): Promise<UserResponseDTO | null> {
        return this.user.find(user => user.id === id) || null
    }
    async findByEmail(email: string): Promise<UserAuthDTO | null> {
        return this.user.find(user => user.email === email) || null
    }

}