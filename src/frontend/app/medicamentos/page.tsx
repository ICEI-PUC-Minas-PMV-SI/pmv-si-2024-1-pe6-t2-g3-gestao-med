import AuthLayout from "../(Authenticated)/layout";
import { UserData } from "../components/userData/userData";
import styles from "./page.module.css";
import { MedicationsList } from "../components/medicationsList/medicationsList";

export default async function Medicamentos() {
  return (
    <AuthLayout>
      <div className={styles.container}>
        <UserData />
        <MedicationsList />
      </div>
    </AuthLayout>
  );
}
