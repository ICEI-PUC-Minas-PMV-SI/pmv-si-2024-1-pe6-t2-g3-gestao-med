import prismaClient from "../../../../../prisma";
import { RegisterDTO, RegistersDTO } from "../../../RegistersDto/registers.dto";
import { IRegistersRepository } from "../../registers.repository";

export class RegistersPrismaRepository implements IRegistersRepository {
    async findByUserIdInPeriod(user_id: string, startDate: Date, endDate: Date): Promise<RegisterDTO[]> {
        return await prismaClient.registers.findMany({
            where: {
                user_id,
                created_at: {
                    gte: startDate,
                    lte: endDate
                }
            },
            select: {
                id: true,
                user_id: true,
                medication_id: true,
                medication_name: true,
                medication_taken: true,
                time_taken: true,
                created_at: true,
                updated_at: true,
            }
        })
    }

    async save(data: RegistersDTO): Promise <RegistersDTO> {
        throw new Error("Method not implemented.");
    }
}