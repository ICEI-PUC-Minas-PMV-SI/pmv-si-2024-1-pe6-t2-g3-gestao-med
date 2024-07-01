'use client'

import { useSession } from 'next-auth/react'
import styles from './userPage.module.css'
import { IUserDetails } from '@/app/lib/model'



export default function UsuarioComponent(data: IUserDetails){

    function trigger(arg0: string): void {
        throw new Error('Function not implemented.')
    }

    return(
        <main className={styles.main}>
            <h1 className={styles.top}>Informações pessoais</h1>
            
            <div className={styles.container}>
                {/* <p className={styles.dataText}>Nome: {data.name}</p> 
                <p className={styles.dataText}>Data de nascimento: { data.date_of_birth.slice(0, 10).split('-').reverse().join('/')}</p>   
                <p className={styles.dataText}>Gênero: {data.gender.replace("MALE", "Masculino").replace("FEMALE", "Feminino")}</p> 
                <p className={styles.dataText}>E-mail: {data.email} </p>  */}

                <input className={styles.dataInput} type="text" placeholder= {data.name} />
                <input className={styles.dataInput} type="email" placeholder= {data.email} />
                <input className={styles.dataInput} type="text" placeholder={data.date_of_birth.slice(0, 10).split('-').reverse().join('/')}/>
                <p className={styles.dataText}>Gênero: {data.gender.replace("MALE", "Masculino").replace("FEMALE", "Feminino")}</p> 
                

                <input type="submit" className={styles.butaoEditar} value="Editar"/>
            </div>
        </main>
    )
}

function register(arg0: string, arg1: { required: string; minLength: { value: number; message: string } }): import("react").JSX.IntrinsicAttributes & import("react").ClassAttributes<HTMLInputElement> & import("react").InputHTMLAttributes<HTMLInputElement> {
    throw new Error('Function not implemented.')
}

