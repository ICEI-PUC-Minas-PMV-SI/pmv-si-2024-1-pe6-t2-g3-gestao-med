'use server'

import { setupAPIClient } from "../services/api"

//Buscar detalhes do usuário
export const getUserDetails = async () => {

    const api = await setupAPIClient()

    try {
        const response = await api.get('/user')

        return response.data

    } catch (err: any) {
        console.log({ err })
    }
}