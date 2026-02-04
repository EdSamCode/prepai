"use client";

import { useCallback, useRef, useState } from "react";
import { useImagePaste } from "@/hooks/useImagePaste";

interface ImageInputProps {
  imageData: string | null;
  onImageChange: (base64DataUrl: string | null) => void;
}

export default function ImageInput({
  imageData,
  onImageChange,
}: ImageInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePaste = useCallback(
    (base64: string) => {
      onImageChange(base64);
    },
    [onImageChange]
  );

  useImagePaste(true, handlePaste);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    readFile(file);
  };

  const readFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("La imagen es muy grande. El maximo es 10MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onImageChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  };

  if (imageData) {
    return (
      <div className="space-y-3">
        <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageData}
            alt="Captura de la oferta"
            className="w-full max-h-[400px] object-contain"
          />
          <button
            type="button"
            onClick={() => {
              onImageChange(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="absolute top-3 right-3 bg-neutral-900/80 hover:bg-red-600 text-neutral-300 hover:text-white p-2 rounded-lg transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="text-xs text-neutral-500 text-center">
          Imagen cargada correctamente
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-300">
        Imagen de la oferta
      </label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging
            ? "border-indigo-500 bg-indigo-500/5"
            : "border-neutral-700 hover:border-neutral-600"
        }`}
      >
        <svg
          className="w-10 h-10 mx-auto text-neutral-600 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
          />
        </svg>
        <p className="text-neutral-400 text-sm mb-1">
          Arrastra una imagen aqui o{" "}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            selecciona un archivo
          </button>
        </p>
        <p className="text-neutral-600 text-xs">
          Tambien puedes presionar <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-400">Ctrl+V</kbd> para pegar una captura de pantalla
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
