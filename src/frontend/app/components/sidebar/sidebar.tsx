'use client'

import styles from './sidebar.module.css'

import LogOutButton from './logOutButton/logOutButton';
import MenuLink from './menuLink/menuLink';
import { useSession } from 'next-auth/react';
import AddMedicationButton from '../addMedicationButton/addMedicationButton';
import Image from 'next/image';

const menuItems = [

    {
        title: "Home",
        path: "/home",
    },
    {
        title: "Medicamentos",
        path: "/medicamentos",
    },
    {
        title: "Notificações",
        path: "/notifications",
    },
    {
        title: "Relatórios",
        path: "/relatorios",
    },
    {
        title: "Meu Perfil",
        path: "/meu-perfil",
    }

];

const SideBar = () => {

    const session = useSession()


    return (
        <>
            <aside className={`${styles.sidebar} `}>
                <div className={styles.logo}>
                    {/* <Image className={styles.image} src="/logotipo.svg" alt='Logotipo' fill /> */}

                </div>
                <div className={styles.container}>
                    <div className={styles.user}>
                        <div className={styles.userDetails}>
                            <span className={styles.userTitle}>Bem vindo</span>
                            <span className={styles.userName}>{session.data?.user.name}</span>
                        </div>

                    </div>
                    <ul className={styles.list}>
                        <li>
                            <MenuLink list={menuItems} />
                        </li>
                        <li className={styles.medButton}>
                            <AddMedicationButton />

                        </li>
                    </ul>
                </div>
                <LogOutButton />
            </aside>



        </>




    )
}

export default SideBar