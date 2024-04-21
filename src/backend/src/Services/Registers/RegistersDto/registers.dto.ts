export type RegistersDTO = {
    id: String
    user_id: string
    medication_id: string
    medication_name: string
    medication_taken: boolean
    time_taken: Date | null
    created_at: Date | null
    updated_at: Date | null
}

export type RegisterDTO = Omit<RegistersDTO, "user_id">