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
        created_at: string,
    }
}
export default function UsuarioComponent(data: UserDetailsProps){
    const userSession = useSession()

    return(
        <main className={styles.main}>
            <h1 className={styles.top}>Informações pessoais</h1>
            
            <div className={styles.container}>
                <p className={styles.dataText}>Nome: {data.user.name}</p> 
                <p className={styles.dataText}>Data de nascimento: { data.user.date_of_birth.slice(0, 10).split('-').reverse().join('/')}</p>   
                <p className={styles.dataText}>Gênero: {data.user.gender.replace("MALE", "Masculino").replace("FEMALE", "Feminino")}</p> 
                <p className={styles.dataText}>E-mail: {data.user.email} </p> 
                <p className={styles.dataText}>Número de Telefone: ({data.user.phone.slice(0, 2) + ") " + data.user.phone.slice(2)} </p> 
                <p className={styles.dataText}>Estado: Minas Gerais </p> 
                <p className={styles.dataText}>Cidade: Montes Claros </p> 
            </div>
        </main>
    )
}

