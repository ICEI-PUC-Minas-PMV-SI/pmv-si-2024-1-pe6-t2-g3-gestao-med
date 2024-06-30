"use client";

import { useForm } from "react-hook-form";
import styles from "./page.module.css";
import Button from "../button/button";
import { FilePdf } from "@phosphor-icons/react";
import { getRegistersReport } from "@/app/lib/actions";
import { useState } from "react";
import { toast } from "react-toastify";

interface FormData {
  startDate: Date | null;
  endDate: Date | null;
}

export function ExportReport() {
  const { register, watch } = useForm<FormData>({
    defaultValues: { startDate: null, endDate: null },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date: string | Date) => {
    const dateObj = new Date(date);
    const adjustedDate = new Date(
      dateObj.getTime() + dateObj.getTimezoneOffset() * 60000
    );
    return adjustedDate.toLocaleDateString("pt-BR");
  };

  const exportReport = async () => {
    if (!startDate && !endDate) return;

    setIsLoading(true);
    const res = await getRegistersReport({
      startDate: (startDate as Date).toString(),
      endDate: (endDate as Date).toString(),
    });

    if (res.status === 404) {
      toast.error("Nenhum registro encontrado no período selecionado!");
    } else {
      const blob = new Blob(
        [Uint8Array.from(atob(res.data.base64), (c) => c.charCodeAt(0))],
        { type: "application/pdf" }
      );
      const url = URL.createObjectURL(blob);

      // Criar link e simular clique
      const link = document.createElement("a");
      link.href = url;
      link.download = `RelatórioGestãoMed${
        formatDate(startDate as Date) + "-" + formatDate(endDate as Date)
      }.pdf`;
      link.click();

      toast.success("Download realizado com sucesso!");

      // Revogar URL após o download
      URL.revokeObjectURL(url);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2>Relatórios</h2>
      <h3>Exportar relatório de ingestão de medicamentos</h3>
      <div className={styles.export_container}>
        <p>Selecione o período:</p>
        <div className={styles.dates_select}>
          <div>
            <p>De:</p>
            <input type="date" {...register("startDate")} />
          </div>
          <div>
            <p>Até:</p>
            <input type="date" {...register("endDate")} />
          </div>
        </div>
      </div>
      <div className={styles.submit_btn}>
        <Button
          variant="secondary"
          full
          loading={isLoading}
          onClick={exportReport}
          disabled={isLoading || !startDate || !endDate}
        >
          Exportar relatório <FilePdf size={28} />
        </Button>
      </div>
    </div>
  );
}
