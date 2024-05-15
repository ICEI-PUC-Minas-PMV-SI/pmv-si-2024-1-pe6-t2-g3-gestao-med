import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  state: string;
  city: string;
  birthDate: Date;
  gender: string;
}

interface CityData {
  [state: string]: string[];
}

enum steps {
  ONE = 1,
  TWO = 2,
}

export function RegisterUserForm() {
  const {
    trigger,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [registerStep, setRegisterStep] = useState<steps.ONE | steps.TWO>(
    steps.ONE
  );

  const loadStatesAndCities = (): { states: string[]; cities: CityData } => {
    const states = ["State 1", "State 2", "State 3"];
    const cities = {
      "State 1": ["City 1", "City 2", "City 3"],
      "State 2": ["City 4", "City 5", "City 6"],
      "State 3": ["City 7", "City 8", "City 9"],
    };
    return { states, cities };
  };

  const { states, cities } = loadStatesAndCities();

  return (
    <div className={styles.modalContainer}>
      <form className={styles.formContainer}>
        {registerStep === steps.ONE && (
          <>
            <div className={styles.formFields}>
              <div className={styles.formField}>
                <input
                  placeholder="Nome"
                  type="text"
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
                <input
                  placeholder="Sobrenome"
                  type="text"
                  {...register("lastName", {
                    required: "Sobrenome obrigatório",
                    minLength: {
                      value: 3,
                      message: "Sobrenome inválido",
                    },
                  })}
                  onBlur={() => trigger("lastName")}
                />
                {errors.lastName && <span>{errors.lastName.message}</span>}
              </div>
            </div>
            <div className={styles.formField}>
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
                onBlur={() => trigger("email")}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className={styles.formField}>
              <input
                placeholder="Senha"
                type="password"
                {...register("password", {
                  required: "Senha obrigatória",
                  minLength: {
                    value: 8,
                    message: "A senha deve ter pelo menos 8 caracteres",
                  },
                })}
                onBlur={() => trigger("password")}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div className={styles.formFields}>
              <div className={styles.formField}>
                <select
                  {...register("state", { required: "Selecione um estado" })}
                  onChange={(e) => {
                    setValue("state", e.target.value);
                    setValue("city", "");
                  }}
                  onBlur={() => trigger("state")}
                >
                  <option value="">Estado</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && <span>{errors.state.message}</span>}
              </div>
              <div className={styles.formField}>
                <select
                  {...register("city", { required: "Selecione uma cidade" })}
                  disabled={!watch("state")}
                  onChange={(e) => setValue("city", e.target.value)}
                  onBlur={() => trigger("city")}
                >
                  <option value="">Cidade</option>
                  {!!watch("state") &&
                    cities[watch("state")].map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
                {errors.city && <span>{errors.city.message}</span>}
              </div>
            </div>
          </>
        )}
        {registerStep === steps.TWO && (
          <>
            <div className={styles.fieldBox}>
              <p>Data de nascimento</p>
              <div className={styles.formField}>
                <input
                  type="date"
                  {...register("birthDate", {
                    required: "Data de nascimento obrigatória",
                  })}
                  onBlur={() => trigger("birthDate")}
                />
                {errors.birthDate && <span>{errors.birthDate.message}</span>}
              </div>
            </div>
            <div className={styles.fieldBox}>
              <p>Gênero</p>
              <div className={styles.formField}>
                <div className={styles.genderOptions}>
                  <div>
                    <input
                      type="radio"
                      id="male"
                      value="male"
                      {...register("gender", {
                        required: "Selecione o gênero",
                      })}
                    />
                    <label htmlFor="male">Masculino</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="female"
                      value="female"
                      {...register("gender", {
                        required: "Selecione o gênero",
                      })}
                    />
                    <label htmlFor="female">Feminino</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="other"
                      value="other"
                      {...register("gender", {
                        required: "Selecione o gênero",
                      })}
                    />
                    <label htmlFor="other">Outro</label>
                  </div>
                </div>
                {errors.gender && <span>{errors.gender.message}</span>}
              </div>
            </div>
            <p className={styles.registerMessage}>
              Ao se cadastrar, você concorda com nossos{" "}
              <span>Termos de uso</span>.
            </p>
          </>
        )}
      </form>
      <div className={styles.buttonsBox}>
        {registerStep === steps.ONE && (
          <button
            onClick={() => {
              isValid
                ? setRegisterStep(steps.TWO)
                : toast.info("Preencha todos os campos corretamente!");
            }}
          >
            Continuar
          </button>
        )}
        {registerStep === steps.TWO && (
          <>
            <button
              onClick={() => {
                isValid
                  ? console.log(getValues())
                  : toast.info("Preencha todos os campos corretamente!");
              }}
            >
              Criar conta
            </button>
            <p onClick={() => setRegisterStep(steps.ONE)}>Voltar</p>
          </>
        )}
      </div>
    </div>
  );
}
