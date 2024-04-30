'use client'

import { signIn, useSession } from 'next-auth/react';
import styles from '../../page.module.css'
import { useRouter } from 'next/navigation';


export default function LoginForm() {
    const router = useRouter()

    const session = useSession()
  
    async function handleLogin(formData: FormData) {
        const { email, password } = Object.fromEntries(formData)

        if (!email || !password) {
            alert("Preencha todos os campos")
            return
        }

        try {
            const response = await signIn('credentials', {
                email,
                password,
                redirect: false
            })


            if (response?.error) {
                router.replace('/')
                return
            }

            router.replace('/home')

        } catch (err: any) {
            console.log("Login error: ", err)

        }
    }

    return (
        <div className={styles.container}>
            <form action={handleLogin} className={styles.form}>
                <div className={styles.inputFied}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' />
                </div>
                <div className={styles.inputFied}>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id='password' name='password' />
                </div>
                <button type='submit'>entrar</button>
            </form>

            <h1>Email: joaotest@joaoteste.com</h1>
            <h1>Senha: joao123</h1>
        </div>
    )
}