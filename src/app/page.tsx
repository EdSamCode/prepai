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
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [nivel, setNivel] = useState<NivelUsuario>("principiante");
  const [activeTab, setActiveTab] = useState<"texto" | "imagen" | "pdf">(
    "texto"
  );

  const canSubmit =
    (activeTab === "texto" && textoContenido.trim().length > 10) ||
    (activeTab === "imagen" && imagenBase64 !== null) ||
    (activeTab === "pdf" && pdfBase64 !== null);

  const handleAnalyze = async () => {
    if (activeTab === "imagen" && imagenBase64) {
      if (!validateImageFormat(imagenBase64)) {
        alert("Formato de imagen no soportado. Usa PNG, JPEG o WebP.");
        return;
      }
    }

    let tipo: "texto" | "imagen" | "pdf" = activeTab;
    let contenido: string;

    if (tipo === "texto") {
      contenido = textoContenido;
    } else if (tipo === "imagen") {
      contenido = imagenBase64!;
    } else {
      contenido = pdfBase64!;
      tipo = "pdf";
    }

    const plan = await generatePlan(tipo, contenido, nivel);
    if (plan) {
      sessionStorage.setItem("prepai-plan", JSON.stringify(plan));
      router.push("/resultado");
    }
  };

  const handleTextoChange = (value: string) => {
    setTextoContenido(value);
    setActiveTab("texto");
  };

  const handleImagenChange = (value: string | null) => {
    setImagenBase64(value);
    if (value) setActiveTab("imagen");
  };

  const handlePdfChange = (base64: string | null, name: string | null) => {
    setPdfBase64(base64);
    setPdfName(name);
    if (base64) setActiveTab("pdf");
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
            pdfBase64={pdfBase64}
            pdfName={pdfName}
            onPdfChange={handlePdfChange}
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
