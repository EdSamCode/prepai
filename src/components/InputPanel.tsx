"use client";

import { useState } from "react";
import TextInput from "./TextInput";
import ImageInput from "./ImageInput";

type InputTab = "texto" | "imagen";

interface InputPanelProps {
  textoContenido: string;
  onTextoChange: (value: string) => void;
  imagenBase64: string | null;
  onImagenChange: (value: string | null) => void;
}

export default function InputPanel({
  textoContenido,
  onTextoChange,
  imagenBase64,
  onImagenChange,
}: InputPanelProps) {
  const [activeTab, setActiveTab] = useState<InputTab>("texto");

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("texto")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === "texto"
              ? "bg-indigo-600 text-white"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Pegar Texto
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("imagen")}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === "imagen"
              ? "bg-indigo-600 text-white"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Subir Imagen
        </button>
      </div>

      {activeTab === "texto" ? (
        <TextInput value={textoContenido} onChange={onTextoChange} />
      ) : (
        <ImageInput imageData={imagenBase64} onImageChange={onImagenChange} />
      )}
    </div>
  );
}
