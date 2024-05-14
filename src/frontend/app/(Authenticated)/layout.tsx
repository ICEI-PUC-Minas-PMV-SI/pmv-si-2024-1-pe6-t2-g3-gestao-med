import { ReactNode } from "react"
import styles from './authLayout.module.css'
import SideBar from "../components/sidebar/sidebar"
import Notifications from "../components/notifications/notifications"
import AddMedicationButton from "../components/addMedicationButton/addMedicationButton"

interface LayoutProps {
    children: ReactNode
}
const AuthLayout = async ({ children }: LayoutProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <SideBar />
            </div>
            <div className={styles.content}>
                {children}
            </div>
            <div className={styles.right}>
                <Notifications />
                <AddMedicationButton />
            </div>
        </div>
    )
}

export default AuthLayout