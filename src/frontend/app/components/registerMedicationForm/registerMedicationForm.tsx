'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";
import { toast } from "react-toastify";
import { registerMedication } from "@/app/lib/actions";

interface FormData {
  name: string;
  description: string;
  stock: number;
  timeToTake: string;
}

interface IRegisterMedicationForm {
  closeRegisterModal: () => void;
}

export function RegisterMedicationForm({ closeRegisterModal }: IRegisterMedicationForm) {
  const {
    trigger,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [timeToTake, setTimeToTake] = useState([""]);

  const handleAddTimeField = (e: any) => {
    e.preventDefault();
    setTimeToTake([...timeToTake, ""]);
  };

  const handleRemoveTimeField = (e: any, index: number) => {
    e.preventDefault();
    setTimeToTake(timeToTake.filter((_, i) => i !== index));
  };

  const handleTimeChange = (e: any, index: number) => {
    timeToTake[index] = e.target.value;
    setTimeToTake([...timeToTake]);
  };

  const [isLoadingRegister, setIsLoadingRegister] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoadingRegister(true);

    try {
      const response = await registerMedication({
        name: data.name.trim(),
        description: data.description,
        stock: Number(data.stock),
        time_to_take: data.timeToTake
      });

      setIsLoadingRegister(false);

      if (response.status !== 201) {
        toast.error("Erro ao cadastrar medicamento!", {position: "top-right"});
        return;
      }

      toast.success("Cadastro realizado com sucesso!");
      closeRegisterModal();
      
    } catch (err: any) {
      console.log(err);
    }
  };

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
            <input type="number" placeholder="Estoque inicial" min="0"
              {...register("stock")}
              onBlur={() => trigger("stock")}
            />
          </div>
        
          {timeToTake.map((time, index) => (
            <div key={index} className={styles.formFieldTime}>
              <input placeholder="HH:MM" type="time" value={time} onChange={(e) => handleTimeChange(e, index)}/>
              {index > 0 && (
                <div className={styles.removeButton}>
                  <button onClick={(e) => handleRemoveTimeField(e, index)}>Remover</button>
                </div>
              )}
            </div>
          ))}
           
          <div className={styles.buttonAddTime}>
            <button onClick={(e) => handleAddTimeField(e)}>
              Adicionar horário
            </button>
          </div>
        </>
      </form>
      <div className={styles.buttonsBox}>
        <>
          <button 
            onClick={() => {
              setValue('timeToTake',  timeToTake.filter((time) => time.length > 0).join(","));
              isValid ? onSubmit(getValues()) : toast.info("Preencha todos os campos corretamente!");
            }}
          >
            Adicionar
          </button>
        </>
      </div>
    </div>
  );
}
