import { RegisterDTO, RegistersDTO } from "../../../RegistersDto/registers.dto";
import { IRegistersRepository } from "../../registers.repository";

export class RegistersMemoryRepository implements IRegistersRepository{
    registers: RegistersDTO[] = []

    async findByUserIdInPeriod(user_id: string, startDate: Date, endDate: Date): Promise<RegisterDTO[]> {
        return this.registers.filter(register =>
            register.user_id === user_id &&
            (register.created_at as Date) >= startDate &&
            (register.created_at as Date) <= endDate
        ).map(({ id, user_id, medication_id, medication_name, medication_taken, time_taken, created_at, updated_at }) => ({
            user_id,
            medication_id,
            medication_name,
            medication_taken,
            time_taken,
            created_at,
            updated_at
        }));
    }

    async save(data: RegistersDTO): Promise<RegistersDTO> {
        this.registers.push(data)

        return data
    }
}