import styles from "./page.module.css";
import LoginForm from "./components/loginForm/loginForm";

export default async function Login() {
  
  return (
    <main className={styles.main}>
      <LoginForm />
    </main>
  );
}
