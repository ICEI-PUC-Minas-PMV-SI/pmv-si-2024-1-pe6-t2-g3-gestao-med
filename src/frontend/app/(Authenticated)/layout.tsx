'use client'

import { ReactNode } from "react"
import styles from './authLayout.module.css'
import SideBar from "../components/sidebar/sidebar"
import Notifications from "../components/notifications/notifications"
import AddMedicationButton from "../components/addMedicationButton/addMedicationButton"
import NextMedication from "../components/notifications/nextMedication/nextMedication"
import { FaChevronLeft } from "react-icons/fa"

interface LayoutProps {
    children: ReactNode
}
const AuthLayout = ({ children }: LayoutProps) => {

    return (
        <div className={styles.container}>
             <input className={styles.activeSidebar} type="checkbox" id="activeSidebar" />
            <aside className={styles.menu}>
                <SideBar />
            </aside> 
            <div className={styles.menuButton}>
                <label htmlFor="activeSidebar">
                    <FaChevronLeft height={8} width={2} />
                </label>
            </div>
            <section className={styles.content}>
                {children}
            </section>
            <aside className={styles.right}>
                <Notifications />
                <NextMedication />
                <AddMedicationButton />
            </aside>
        </div>
    )
}

export default AuthLayout