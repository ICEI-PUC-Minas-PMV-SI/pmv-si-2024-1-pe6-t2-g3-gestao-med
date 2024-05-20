'use client'

import { useSession } from 'next-auth/react'
import styles from './userPage.module.css'
import { IUserDetails } from '@/app/lib/model'



export default function UsuarioComponent(data: IUserDetails){

    return(
        <main className={styles.main}>
            <h1 className={styles.top}>Informações pessoais</h1>
            
            <div className={styles.container}>
                <p className={styles.dataText}>Nome: {data.name}</p> 
                <p className={styles.dataText}>Data de nascimento: { data.date_of_birth.slice(0, 10).split('-').reverse().join('/')}</p>   
                <p className={styles.dataText}>Gênero: {data.gender.replace("MALE", "Masculino").replace("FEMALE", "Feminino")}</p> 
                <p className={styles.dataText}>E-mail: {data.email} </p> 
                <p className={styles.dataText}>Número de Telefone: ({data.phone.slice(0, 2) + ") " + data.phone.slice(2)} </p> 
            </div>
        </main>
    )
}

