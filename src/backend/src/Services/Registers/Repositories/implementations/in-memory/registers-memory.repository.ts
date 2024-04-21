import { RegistersDTO } from "../../../RegistersDto/registers.dto";
import { IRegistersRepository } from "../../registers.repository";

export class RegistersMemoryRepository implements IRegistersRepository{
    registers: RegistersDTO[] = []

    async findByUserId(user_id: string): Promise<RegistersDTO[]> {
        return this.registers.filter(register => register.user_id === user_id)
    }

    async save(data: RegistersDTO): Promise<RegistersDTO> {
        this.registers.push(data)

        return data
    }
}