'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LogOutButton() {
    const router = useRouter()

    async function logOut() {
        await signOut({
            redirect: false
        })

        router.replace('/')
    }
    return (
        <button  onClick={logOut}>
            Sair
        </button>
    )
}