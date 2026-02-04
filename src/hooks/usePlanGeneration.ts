"use client";

import { useState } from "react";
import type { NivelUsuario, PlanCompleto } from "@/lib/types";

interface UsePlanGenerationReturn {
  isLoading: boolean;
  error: string | null;
  generatePlan: (
    tipo: "texto" | "imagen",
    contenido: string,
    nivel: NivelUsuario
  ) => Promise<PlanCompleto | null>;
}

export function usePlanGeneration(): UsePlanGenerationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePlan = async (
    tipo: "texto" | "imagen",
    contenido: string,
    nivel: NivelUsuario
  ): Promise<PlanCompleto | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint =
        tipo === "texto" ? "/api/analizar" : "/api/analizar-imagen";

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
