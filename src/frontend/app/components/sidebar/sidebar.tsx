'use client'

import styles from './sidebar.module.css'

import LogOutButton from './logOutButton/logOutButton';
import { BsBoxArrowInLeft, BsBoxArrowInRight } from "react-icons/bs";
import MenuLink from './menuLink/menuLink';
import { useSession } from 'next-auth/react';
import { IoMenu } from "react-icons/io5";
import { useState } from 'react';
import AddMedicationButton from '../addMedicationButton/addMedicationButton';

const menuItems = [

    {
        title: "Home",
        path: "/home",
    },
    {
        title: "Meu Perfil",
        path: "/meu-perfil",
    },
    {
        title: "Medicamentos",
        path: "/medicamentos",
    }

];

const SideBar = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)

    const session = useSession()

    const handleMenu = () => {
        if (menuIsOpen) {
            setMenuIsOpen(false)
        } else {
            setMenuIsOpen(true)
        }
    }
    return (
        <>
            <aside className={`${styles.sidebar} `}>
                <div className={styles.container}>
                    <div className={styles.user}>
                        {/* <Image className={styles.userImage} src="/noavatar.png" alt='' width="50" height="50" /> */}
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