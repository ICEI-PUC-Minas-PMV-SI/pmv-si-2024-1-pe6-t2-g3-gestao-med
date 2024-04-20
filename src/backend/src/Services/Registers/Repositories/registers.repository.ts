import { RegisterDTO, RegistersDTO } from "../RegistersDto/registers.dto";

export interface IRegistersRepository{
    save(data: RegistersDTO): Promise<RegistersDTO>
    findByUserIdInPeriod(user_id: string, startDate: Date, endDate: Date): Promise<RegisterDTO[]>
}