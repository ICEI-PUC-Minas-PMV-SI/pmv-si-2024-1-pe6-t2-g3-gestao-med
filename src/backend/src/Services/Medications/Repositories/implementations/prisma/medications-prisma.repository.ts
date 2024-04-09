import prismaClient from "../../../../../prisma";
import { MedicationsDTO } from "../../../MedicationsDto/medications.dto";
import { IMedicationsRepository } from "../../medications.repository";

export class MedicationsPrismaRepository implements IMedicationsRepository{
    async findByUserid(user_id: string): Promise<MedicationsDTO[]> {
        return await prismaClient.medications.findMany({
            where:{
                user_id
            },
            select:{
                id: true,
                user_id: true,
                name: true,
                description: true,
                stock: true,
                time_to_take: true,
                treatment_finished_at: true,
                created_at: true,
                updated_at: true
            }
        })
    }

    async save(): Promise<MedicationsDTO> {
        throw new Error("Method not implemented.");
    }

}