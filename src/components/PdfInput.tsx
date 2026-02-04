"use client";

import { useRef, useState } from "react";

interface PdfInputProps {
  pdfData: string | null;
  pdfName: string | null;
  onPdfChange: (base64: string | null, name: string | null) => void;
}

export default function PdfInput({ pdfData, pdfName, onPdfChange }: PdfInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  };

  const readFile = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Solo se aceptan archivos PDF.");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      alert("El PDF es muy grande. El maximo es 15MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onPdfChange(reader.result as string, file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  };

  if (pdfData) {
    return (
      <div className="space-y-3">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-200 truncate">
              {pdfName}
            </p>
            <p className="text-xs text-neutral-500">PDF cargado correctamente</p>
          </div>
          <button
            type="button"
            onClick={() => {
              onPdfChange(null, null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="p-2 text-neutral-500 hover:text-red-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-neutral-300">
        Documento PDF
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
            ? "border-red-500 bg-red-500/5"
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <p className="text-neutral-400 text-sm mb-1">
          Arrastra un PDF aqui o{" "}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            selecciona un archivo
          </button>
        </p>
        <p className="text-neutral-600 text-xs">
          Sube un temario, libro, ensayo, oferta laboral o cualquier documento en PDF
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
