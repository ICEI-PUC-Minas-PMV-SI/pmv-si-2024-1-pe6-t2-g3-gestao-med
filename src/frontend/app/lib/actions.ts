"use server";

import { setupAPIClient } from "../services/api";
import { IMedication, IUserDetails } from "./model";

//Buscar detalhes do usuário
export const getUserDetails = async () => {
  const api = await setupAPIClient();

  try {
    const response = await api.get<IUserDetails>("/user");

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

export const getUserMedications = async () => {
  const api = await setupAPIClient();

  try {
    const response = await api.get<IMedication[]>("/medications");

    return response.data;
  } catch (err: any) {
    console.log({ err });
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
    console.log({ err });
    return { status: "", data: [] };
  }
};
