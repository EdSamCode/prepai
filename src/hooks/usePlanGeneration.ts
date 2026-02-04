"use client";

import { useState } from "react";
import type { NivelUsuario, PlanCompleto } from "@/lib/types";

interface UsePlanGenerationReturn {
  isLoading: boolean;
  error: string | null;
  generatePlan: (
    tipo: "texto" | "imagen" | "pdf",
    contenido: string,
    nivel: NivelUsuario
  ) => Promise<PlanCompleto | null>;
}

const ENDPOINT_MAP: Record<string, string> = {
  texto: "/api/analizar",
  imagen: "/api/analizar-imagen",
  pdf: "/api/analizar-pdf",
};

export function usePlanGeneration(): UsePlanGenerationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePlan = async (
    tipo: "texto" | "imagen" | "pdf",
    contenido: string,
    nivel: NivelUsuario
  ): Promise<PlanCompleto | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = ENDPOINT_MAP[tipo];

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contenido, nivel }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || `Error del servidor (${res.status})`
        );
      }

      const plan: PlanCompleto = await res.json();
      return plan;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Ha ocurrido un error inesperado. Intenta de nuevo.";
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, generatePlan };
}
