import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  description: string;
  stock: number;
  timeToTake: string;
}

export function RegisterMedicationForm() {
  const {
    trigger,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  return (
    <div className={styles.modalContainer}>
      <form className={styles.formContainer}>
        <>
          <div className={styles.formFields}>
            <input placeholder="Nome" type="text"
              {...register("name", {
                required: "Nome obrigatório",
                minLength: {
                  value: 3,
                  message: "Nome inválido",
                },
              })}
              onBlur={() => trigger("name")}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>

          <div className={styles.formField}>
            <input placeholder="Descrição"
              type="text"
              {...register("description", {
                required: "Descrição obrigatória",
                minLength: {
                  value: 3,
                  message: "Descrição inválida",
                },
              })}
              onBlur={() => trigger("description")}
            />
            {errors.description && <span>{errors.description.message}</span>}
          </div>

          <div className={styles.formField}>
            <input type="number" placeholder="Estoque inicial - opcional" min="0"
              {...register("stock")}
              onBlur={() => trigger("stock")}
            />
          </div>
          
          <div className={styles.formField}>
            <input placeholder="Período de uso" type="text"
              {...register("timeToTake", {
                required: "Período de uso obrigatório",
                minLength: {
                  value: 3,
                  message: "Período de uso inválido",
                },
              })}
              onBlur={() => trigger("timeToTake")}
            />
            {errors.timeToTake && <span>{errors.timeToTake.message}</span>}
          </div>

        </>
      </form>
      <div className={styles.buttonsBox}>
        <>
          <button
            onClick={() => {
              isValid
                ? console.log(getValues())
                : toast.info("Preencha todos os campos corretamente!");
            }}
          >
            Adicionar
          </button>
        </>
      </div>
    </div>
  );
}
