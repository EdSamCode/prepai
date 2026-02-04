"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NivelUsuario } from "@/lib/types";
import { usePlanGeneration } from "@/hooks/usePlanGeneration";
import { validateImageFormat } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import InputPanel from "@/components/InputPanel";
import LevelSelector from "@/components/LevelSelector";
import AnalyzeButton from "@/components/AnalyzeButton";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Home() {
  const router = useRouter();
  const { isLoading, error, generatePlan } = usePlanGeneration();
  const [textoContenido, setTextoContenido] = useState("");
  const [imagenBase64, setImagenBase64] = useState<string | null>(null);
  const [nivel, setNivel] = useState<NivelUsuario>("principiante");
  const [activeTab, setActiveTab] = useState<"texto" | "imagen">("texto");

  const canSubmit =
    (activeTab === "texto" && textoContenido.trim().length > 10) ||
    (activeTab === "imagen" && imagenBase64 !== null);

  const handleAnalyze = async () => {
    if (activeTab === "imagen" && imagenBase64) {
      if (!validateImageFormat(imagenBase64)) {
        alert("Formato de imagen no soportado. Usa PNG, JPEG o WebP.");
        return;
      }
    }

    const tipo = activeTab;
    const contenido = tipo === "texto" ? textoContenido : imagenBase64!;

    const plan = await generatePlan(tipo, contenido, nivel);
    if (plan) {
      sessionStorage.setItem("prepai-plan", JSON.stringify(plan));
      router.push("/resultado");
    }
  };

  // Sync the active tab from InputPanel
  const handleTextoChange = (value: string) => {
    setTextoContenido(value);
    setActiveTab("texto");
  };

  const handleImagenChange = (value: string | null) => {
    setImagenBase64(value);
    if (value) setActiveTab("imagen");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        <HeroSection />

        <div className="mt-8 space-y-6 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <InputPanel
            textoContenido={textoContenido}
            onTextoChange={handleTextoChange}
            imagenBase64={imagenBase64}
            onImagenChange={handleImagenChange}
          />

          <LevelSelector nivel={nivel} onChange={setNivel} />

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <AnalyzeButton
            onClick={handleAnalyze}
            disabled={!canSubmit}
            loading={isLoading}
          />
        </div>
      </main>

      <Footer />

      {isLoading && <LoadingOverlay />}
    </div>
  );
}
