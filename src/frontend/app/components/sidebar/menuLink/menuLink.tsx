'use client'

import { usePathname } from 'next/navigation';
import styles from './menuLink.module.css';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { AppMedicationContext } from '@/app/context';
import { IoIosAlert } from "react-icons/io";

type MenuLinkProps = {
    list: ListProps[]
}

type ListProps = {
    title: string,
    path: string,
}


const MenuLink = ({ list }: MenuLinkProps) => {
    const [notification, setNotification] = useState(false)

    const { medications } = useContext(AppMedicationContext)

    // medications.forEach((med) => {
    //     if (med.stock <= 3 && !med.deleted_at && !med.treatment_finished_at) {
    //         setNotification(true)
    //     }
    // })

    const pathname = usePathname();
    return (
        <div className={styles.container}>
            {list.map((item, index) => (

                <Link key={index} href={item.path} className={`${styles.link} ${item.path === pathname && styles.active}`}>
                    {medications.find((med) => med.stock <= 3 && !med.deleted_at && !med.treatment_finished_at) && (
                        <>
                            {item.title === 'Notificações' && (
                                <>
                                   <IoIosAlert className={styles.notificationIcon}/>
                                </>
                            )}
                        </>
                    )}

                    {item.title}
                </Link>

            ))}
        </div>
    );
}

export default MenuLink;
