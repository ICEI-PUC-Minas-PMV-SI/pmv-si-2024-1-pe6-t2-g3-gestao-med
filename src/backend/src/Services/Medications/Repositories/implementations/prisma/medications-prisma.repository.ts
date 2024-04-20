import prismaClient from "../../../../../prisma";
import { MedicationsDTO } from "../../../MedicationsDto/medications.dto";
import { IMedicationsRepository } from "../../medications.repository";

export class MedicationsPrismaRepository implements IMedicationsRepository{
    
    async findById(medication_id: string): Promise<MedicationsDTO | null> {
        return await prismaClient.medications.findUnique({
            where:{
                id:medication_id
            }
        })
    }
    async findByUserId(user_id: string): Promise<MedicationsDTO[]> {
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

    async save(): Promise<MedicationsDTO> {
        throw new Error("Method not implemented.");
    }

    async register(user_id: string, medication_id: string, time_taken: Date): Promise<void> {
        // porque não tem o user_id na tabela registers?
        await prismaClient.registers.create({
            data: {
                medication_id: medication_id,
                time_taken: new Date(time_taken),
                medication_taken: true,
                created_at: new Date()
            }
        })
    }
}