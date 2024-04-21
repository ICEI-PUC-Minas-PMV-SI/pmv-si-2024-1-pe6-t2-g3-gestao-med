import { CustomError } from "../../../../errors/custom.error";
import { IMedicationsRepository } from "../../Repositories/medications.repository";

class DeleteMedicationService{
    constructor(private medicationRepository: IMedicationsRepository){

    }
    async execute(medicationId: string, userId: string){
        if(!medicationId)throw new CustomError("Medication id is required", 400)
        if(!userId)throw new CustomError("User id is required", 400)

        const medication = await this.medicationRepository.findById(medicationId)

        if (medication == null) {
            throw new CustomError("Medication not found", 400)
        }

        if (medication.deleted_at !== null) {
            throw new CustomError("Medication is already deleted", 400)
        }
        
        if (medication.user_id !== userId) {
            throw new CustomError("Invalid operation", 400)
        }

        await this.medicationRepository.delete(medicationId)

        return "Medicamento deletado com sucesso"
    }
}

export{DeleteMedicationService}