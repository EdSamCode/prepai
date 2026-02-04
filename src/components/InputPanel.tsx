"use client";

import { useState } from "react";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";
import PdfInput from "./PdfInput";

type InputTab = "texto" | "imagen" | "pdf";

interface InputPanelProps {
  textoContenido: string;
  onTextoChange: (value: string) => void;
  imagenBase64: string | null;
  onImagenChange: (value: string | null) => void;
  pdfBase64: string | null;
  pdfName: string | null;
  onPdfChange: (base64: string | null, name: string | null) => void;
}

const TABS: { key: InputTab; label: string; icon: string }[] = [
  { key: "texto", label: "Texto", icon: "📝" },
  { key: "imagen", label: "Imagen", icon: "📸" },
  { key: "pdf", label: "PDF", icon: "📄" },
];

export default function InputPanel({
  textoContenido,
  onTextoChange,
  imagenBase64,
  onImagenChange,
  pdfBase64,
  pdfName,
  onPdfChange,
}: InputPanelProps) {
  const [activeTab, setActiveTab] = useState<InputTab>("texto");

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-1.5 ${
              activeTab === tab.key
                ? "bg-indigo-600 text-white"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <span className="text-xs">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "texto" && (
        <TextInput value={textoContenido} onChange={onTextoChange} />
      )}
      {activeTab === "imagen" && (
        <ImageInput imageData={imagenBase64} onImageChange={onImagenChange} />
      )}
      {activeTab === "pdf" && (
        <PdfInput pdfData={pdfBase64} pdfName={pdfName} onPdfChange={onPdfChange} />
      )}
    </div>
  );
}
