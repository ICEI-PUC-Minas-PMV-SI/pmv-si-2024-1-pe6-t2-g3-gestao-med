import NextAuth from "next-auth/next";

declare module 'next-auth' {
    interface Session {
        user:{
            uuid: string
            is_admin: boolean
            document: string | null
            email: string | null
            name: string | null
            phone: string | null
            token: string
            created_at: date
            date_of_birth: string
        }
    }
}