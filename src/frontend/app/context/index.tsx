"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type ContextMedicationData = {
  medications: MedicationProps[];
};

export type MedicationProps = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  stock: number;
  time_to_take: string;
  treatment_finished_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export const AppMedicationContext = createContext({} as ContextMedicationData);

export function AppWrapper({
  children,
  apiData,
}: {
  children: React.ReactNode;
  apiData: MedicationProps[];
}) {
  const [medications, setMedications] = useState<MedicationProps[]>(apiData);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppMedicationContext.Provider value={{ medications }}>
        {children}
      </AppMedicationContext.Provider>
    </QueryClientProvider>
  );
}
