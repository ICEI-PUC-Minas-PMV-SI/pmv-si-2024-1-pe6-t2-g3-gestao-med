import AuthLayout from "../(Authenticated)/layout";
import { ExportReport } from "../components/exportReport/exportReport";
import { UserData } from "../components/userData/userData";
import styles from "./page.module.css";

export default async function Relatorios() {
  return (
    <AuthLayout>
      <div className={styles.container}>
        <UserData />
        <ExportReport />
      </div>
    </AuthLayout>
  );
}
