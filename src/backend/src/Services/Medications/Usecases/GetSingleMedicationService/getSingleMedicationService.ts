
import { CustomError } from "../../../../errors/custom.error"
import { IUsersRepository } from "../../../Users/Repositories/users.repository"
import { IMedicationsRepository } from "../../Repositories/medications.repository"



class GetSingleMedicationService {

    constructor(
        private medicationsRepository: IMedicationsRepository,
        private usersRepository: IUsersRepository
    ) { }
    async execute(user_id: string, medication_id: string) {
        if (!user_id) {
            throw new CustomError("User id is required", 400)
        }
        if (!medication_id) {
            throw new CustomError("User id is required", 400)
        }
        const user = await this.usersRepository.findById(user_id)
        if (!user) throw new CustomError("User not found", 404)


        const medication = await this.medicationsRepository.findById(medication_id)
        if (!medication) {
            throw new CustomError("Medication not found", 404) }
        return medication
    }
}

export { GetSingleMedicationService }