import prismaClient from "../../../../../prisma";
import { MedicationsDTO } from "../../../MedicationsDto/medications.dto";
import { IMedicationsRepository } from "../../medications.repository";

export class MedicationsPrismaRepository implements IMedicationsRepository{
   
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

    async save(data: MedicationsDTO): Promise<MedicationsDTO> {
        return await prismaClient.medications.create({
            data:{
                id: data.id,
                user_id: data.user_id,
                name: data.name,
                description: data.description,
                stock: data.stock,
                time_to_take: data.time_to_take,
                treatment_finished_at: data.treatment_finished_at
            }
           
        })
    }
    
    async edit(data: MedicationsDTO): Promise<MedicationsDTO> {
        const medication = await prismaClient.medications.update({
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
        return medication
    }

    async register(user_id: string, medication_id: string, time_taken: Date): Promise<void> {
        // porque não tem o user_id na tabela registers?
        await prismaClient.registers.create({
            data: {
                user_id,
                medication_name:'',
                medication_id: medication_id,
                time_taken: new Date(time_taken),
                medication_taken: true,
                created_at: new Date()
            }
        })
    }
}