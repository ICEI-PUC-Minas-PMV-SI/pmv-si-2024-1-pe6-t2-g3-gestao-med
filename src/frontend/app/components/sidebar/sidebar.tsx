
import styles from './sidebar.module.css'

import LogOutButton from './logOutButton/logOutButton';
import { auth } from '@/app/lib/auth';
import Link from 'next/link';
import MenuLink from './menuLink/menuLink';

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

const SideBar = async () => {

    const session = await auth()

    return (

        <aside className={styles.sidebar}>
            <div className={styles.container}>
                <div className={styles.user}>
                    {/* <Image className={styles.userImage} src="/noavatar.png" alt='' width="50" height="50" /> */}
                    <div className={styles.userDetails}>
                        <span className={styles.userTitle}>Bem vindo</span>
                        <span className={styles.userName}>{session?.user.name}</span>
                    </div>

                </div>
                <ul className={styles.list}>
                    <li>
                        <MenuLink list={menuItems} />
                    </li>
                </ul>
            </div>
            <LogOutButton />
        </aside>

    )
}

export default SideBar