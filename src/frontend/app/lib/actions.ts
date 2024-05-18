"use server";

import { setupAPIClient } from "../services/api";

//Buscar detalhes do usuário
export const getUserDetails = async () => {
  const api = await setupAPIClient();

  try {
    const response = await api.get("/user");

    return response.data;
  } catch (err: any) {
    console.log({ err });
  }
};

export const getMedications = async () => {
  const api = await setupAPIClient();

  try {
    const response = await api.get("/medications");

    return { status: response.status, data: response.data };
  } catch (err: any) {
    if (err.response) {
      console.log({ err });
      return { status: err.response.status, data: err.response.data.error };
    }
    console.log({ err });
    return { status: "", data: [] };
  }
};

export const registerUser = async (params: {
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: "male" | "female" | "other";
  password: string;
}) => {
  const api = await setupAPIClient();

  try {
    const response = await api.post("/user", {
      ...params,
    });

    return { status: response.status, data: response.data };
  } catch (err: any) {
    if (err.response) {
      console.log({ err });
      return { status: err.response.status, data: err.response.data.error };
    }
<<<<<<< HEAD
}
=======
    console.log({ err });
    return { status: "", data: [] };
  }
};
>>>>>>> main
