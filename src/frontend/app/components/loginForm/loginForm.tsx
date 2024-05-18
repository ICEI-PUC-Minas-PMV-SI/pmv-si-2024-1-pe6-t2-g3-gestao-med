"use client";

import { signIn } from "next-auth/react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "../modal/modal";
import { RegisterUserForm } from "../registerUserForm/registerUserForm";
import Button from "../button/button";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    setIsLoadingLogin(true);
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setIsLoadingLogin(false);

      if (response?.error) {
        toast.error("Email ou senha incorretos!", {
          position: "top-right",
        });
        return;
      }

      router.replace("/home");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.logo_box}>
          <h1>Gestão Med</h1>
          <p>A gente te ajuda a se medicar na hora certa.</p>
        </div>
        <div className={styles.form_box}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form_field}>
              <input
                placeholder="Email"
                type="text"
                {...register("email", {
                  required: "Email obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Endereço de email inválido",
                  },
                })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className={styles.form_field}>
              <input
                placeholder="Senha"
                type="password"
                {...register("password", { required: "Senha obrigatória" })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <Button type="submit" full loading={isLoadingLogin}>
              Entrar
            </Button>
            <hr className={styles.hr} />
            <Button
              variant="secondary"
              onClick={() => setIsOpenRegisterModal(true)}
            >
              Criar conta
            </Button>
          </form>
        </div>
      </div>
      <div className={styles.footer}>
        <p>GestãoMed &copy; 2024</p>
      </div>
      <Modal
        isModalOpen={isOpenRegisterModal}
        onCloseModal={() => setIsOpenRegisterModal(false)}
        modalTitle="Cadastro do usuário"
      >
        <RegisterUserForm
          closeRegisterModal={() => setIsOpenRegisterModal(false)}
        />
      </Modal>
    </main>
  );
}
