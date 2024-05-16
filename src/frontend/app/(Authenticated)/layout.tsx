import { ReactNode } from "react"
import styles from './authLayout.module.css'
import SideBar from "../components/sidebar/sidebar"
import Notifications from "../components/notifications/notifications"
import AddMedicationButton from "../components/addMedicationButton/addMedicationButton"
import NextMedication from "../components/notifications/nextMedication/nextMedication"

interface LayoutProps {
    children: ReactNode
}
const AuthLayout = async ({ children }: LayoutProps) => {

    return (
        <div className={styles.container}>
            <aside className={styles.menu}>
                <SideBar />
            </aside>
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