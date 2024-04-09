export type MedicationsDTO = {
    id: string
    user_id: string
    name: string
    description: string
    stock: number
    time_to_take: string
    treatment_finished_at: Date | null
    created_at: Date | null
    updated_at: Date | null
}