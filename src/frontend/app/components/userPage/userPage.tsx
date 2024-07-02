'use client'

import { signOut, useSession } from 'next-auth/react'
import styles from './userPage.module.css'
import { useState } from 'react'
import { editUser } from '@/app/lib/actions'
import { toast } from 'react-toastify'

export default function UsuarioComponent() {
    const { data } = useSession()
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(data?.user.name || '')
    const [email, setEmail] = useState(data?.user.email || '')
    const [gender, setGender] = useState(data?.user.gender || '')
    const [birthday, setBirthday] = useState(data?.user.date_of_birth ? data.user.date_of_birth.slice(0, 10) : '')

    const handleEditUser = async (formData: FormData) => {
        setLoading(true)
        const result = await editUser(formData)

        if (result.status === 204) {
            toast.success("Dados editados com sucesso")
            setLoading(false)
            await signOut()
        }
    }

    return (
        <main className={styles.main}>
            <h1 className={styles.top}>Informações pessoais</h1>

            <form className={styles.container} action={handleEditUser}>

                <div className={styles.inputBox}>
                    <label htmlFor="name">Nome: </label>
                    <input
                        className={styles.dataInput}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="email">Email: </label>
                    <input
                        className={styles.dataInput}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="birthday">Data de Nascimento: </label>
                    <input
                        className={styles.dataInput}
                        type="date"
                        id="birthday"
                        name="date_of_birth"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <div className={styles.inputBox}>
                    <label htmlFor="gender">Gênero: </label>
                    <select
                        id="gender"
                        name="gender"
                        className={styles.dataInput}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="MALE">Masculino</option>
                        <option value="FEMALE">Feminino</option>
                        <option value="OTHER">Outro</option>
                    </select>
                </div>

                <button className={styles.button} type="submit">
                    {loading ? "Carregando" :
                        "Editar dados"
                    }
                </button>
            </form>
        </main>
    )
}