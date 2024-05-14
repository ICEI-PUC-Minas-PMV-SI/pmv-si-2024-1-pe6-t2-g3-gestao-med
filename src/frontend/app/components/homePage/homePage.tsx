'use client'

import { getUserDetails } from "@/app/lib/actions";
import styles from '../../home/home.module.css'

export default function HomePage() {

    
    async function getUserDetailsaaa() {
         const user = await getUserDetails()
        console.log({user})
    }

    return (
        <main className={styles.main}>
            <h1>Para Hoje</h1>
        </main>
    )
}