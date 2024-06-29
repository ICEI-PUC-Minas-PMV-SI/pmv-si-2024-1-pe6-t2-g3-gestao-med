"use server";

import { revalidatePath } from "next/cache";
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


export const deleteMedicationAction = async (id: string) => {
  const api = await setupAPIClient()

  try {
    const response = await api.post(`/medication/delete/${id}`)

    return { status: response.status }
  } catch (err: any) {

    console.log({ err })

    return { status: '' }
  }


}

export const updateMedicationStock = async (medicationId: string, stock: number) => {
  if(!medicationId || !stock) return

  
  try{
    const api = await setupAPIClient()
    
    const response = await api.put(`/medication/edit`, {
      id: medicationId,
      stock
    })

    return { status: response.status }
  }catch(err: any){
    console.log({err})

    return {status: ''}
  }
}