import { Gender } from "@prisma/client"

export type UserAuthDTO = {
    id: string
    isAdmin: boolean
    email: string
    name: string
    phone: string
    date_of_birth: Date
    gender: Gender
    password: string
    created_at: Date | null
    updated_at: Date | null
}

export type UserRequestDTO = Omit<UserAuthDTO, "id">
export type UserResponseDTO = Omit<UserAuthDTO, "password">

