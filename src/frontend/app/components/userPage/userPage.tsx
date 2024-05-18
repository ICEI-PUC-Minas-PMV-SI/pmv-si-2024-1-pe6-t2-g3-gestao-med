'use client'

import { useSession } from 'next-auth/react'
import styles from './userPage.module.css'


type UserDetailsProps = {
    user:{
        id: string,
        isAdmin: boolean,
        email: string,
        name: string,
        phone: string,
        date_of_birth: string,
        gender: string,
        created_at: string
    }
}
export default function UsuarioComponent(data: UserDetailsProps){

    const userSession = useSession()
    
    return(
        <main className={styles.main}>
            <h1 className={styles.top}>Informações pessoais</h1>
            
            <div className={styles.container}>
                name: {userSession.data?.user.name}
                email: {userSession.data?.user.email}
            </div>
        </main>
    )
}