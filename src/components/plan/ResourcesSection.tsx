"use client";

import { useState } from "react";
import type { RecursoGratuito } from "@/lib/types";
import SectionWrapper from "./SectionWrapper";

const TIPO_LABELS: Record<string, string> = {
  curso: "Curso",
  tutorial: "Tutorial",
  documentacion: "Docs",
  video: "Video",
  libro: "Libro",
  practica: "Practica",
};

interface ResourcesSectionProps {
  recursos: RecursoGratuito[];
}

export default function ResourcesSection({ recursos }: ResourcesSectionProps) {
  const [filtro, setFiltro] = useState<string>("todos");

  const tipos = ["todos", ...new Set(recursos.map((r) => r.tipo))];
  const filtered =
    filtro === "todos" ? recursos : recursos.filter((r) => r.tipo === filtro);

  return (
    <SectionWrapper
      icon={
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      }
      titulo="Recursos Gratuitos"
      subtitulo={`${recursos.length} recursos recomendados`}
    >
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {tipos.map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => setFiltro(tipo)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filtro === tipo
                  ? "bg-indigo-600 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tipo === "todos" ? "Todos" : TIPO_LABELS[tipo] || tipo}
            </button>
          ))}
        </div>

        {/* Resources grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((recurso, i) => (
            <a
              key={i}
              href={recurso.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-colors group block"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-neutral-100 text-sm group-hover:text-indigo-400 transition-colors pr-2">
                  {recurso.nombre}
                </h3>
                <svg className="w-4 h-4 text-neutral-600 group-hover:text-indigo-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <p className="text-xs text-neutral-500 mb-2 line-clamp-2">
                {recurso.descripcion}
              </p>
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-[10px] px-2 py-0.5 bg-neutral-800 rounded-full text-neutral-400">
                  {recurso.plataforma}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    recurso.idioma === "es"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  }`}
                >
                  {recurso.idioma === "es" ? "Espanol" : "Ingles"}
                </span>
                <span className="text-[10px] text-neutral-600">
                  {recurso.duracionEstimada}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
