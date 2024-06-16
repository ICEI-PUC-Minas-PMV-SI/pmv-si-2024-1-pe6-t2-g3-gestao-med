import { UserAuthDTO, UserRequestDTO, UserResponseDTO } from "../UserDto/user.dto";

export interface IUsersRepository{
    save(data: UserAuthDTO): Promise<void>
    findById(id: string): Promise<UserResponseDTO | null>
    findByEmail(email: string):Promise<UserAuthDTO | null>
    update(email: string | null, name: string | null, date_of_birth: Date | null, gender: string | null, user_id: string): Promise<void>
}