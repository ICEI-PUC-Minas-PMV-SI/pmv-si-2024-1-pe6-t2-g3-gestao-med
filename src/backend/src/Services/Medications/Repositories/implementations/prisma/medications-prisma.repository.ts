import prismaClient from "../../../../../prisma";
import { MedicationsDTO } from "../../../MedicationsDto/medications.dto";
import { IMedicationsRepository } from "../../medications.repository";

export class MedicationsPrismaRepository implements IMedicationsRepository {

    async findById(medication_id: string): Promise<MedicationsDTO | null> {
        return await prismaClient.medications.findUnique({
            where: {
                id: medication_id
            }
        })
    }
    async findByUserId(user_id: string): Promise<MedicationsDTO[]> {
        return await prismaClient.medications.findMany({
            where: {
                user_id
            },
            select: {
                id: true,
                user_id: true,
                name: true,
                description: true,
                stock: true,
                time_to_take: true,
                treatment_finished_at: true,
                created_at: true,
                updated_at: true,
                deleted_at: true
            }
        })
    }

    async delete(medication_id: string): Promise<void> {
        await prismaClient.medications.update({
            where: {
                id: medication_id
            },
            data: {
                deleted_at: new Date()
            }


        })
    }

    async edit(data: MedicationsDTO): Promise<MedicationsDTO> {
        await prismaClient.medications.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                description: data.description,
                stock: data.stock,
                time_to_take: data.time_to_take,
                treatment_finished_at: data.treatment_finished_at
            }

        })

        throw new Error("Method not implemented.");
    }

    async save(): Promise < MedicationsDTO > {
    throw new Error("Method not implemented.");
}
}