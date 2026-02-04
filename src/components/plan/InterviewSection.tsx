"use client";

import { useState } from "react";
import type { PreguntaEntrevista } from "@/lib/types";
import SectionWrapper from "./SectionWrapper";

const CATEGORIA_LABELS: Record<string, string> = {
  tecnica: "Tecnica",
  comportamental: "Comportamental",
  sistema: "Diseno de Sistema",
  algoritmo: "Algoritmo",
};

const DIFICULTAD_COLORS: Record<string, string> = {
  facil: "text-green-400",
  medio: "text-amber-400",
  dificil: "text-red-400",
};

interface InterviewSectionProps {
  entrevista: PreguntaEntrevista[];
}

export default function InterviewSection({
  entrevista,
}: InterviewSectionProps) {
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");

  const categorias = [
    "todas",
    ...new Set(entrevista.map((q) => q.categoria)),
  ];
  const filtered =
    filtroCategoria === "todas"
      ? entrevista
      : entrevista.filter((q) => q.categoria === filtroCategoria);

  return (
    <SectionWrapper
      icon={
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
      titulo="Preguntas de Entrevista"
      subtitulo={`${entrevista.length} preguntas con respuestas modelo`}
    >
      <div className="space-y-4">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFiltroCategoria(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filtroCategoria === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {cat === "todas" ? "Todas" : CATEGORIA_LABELS[cat] || cat}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-2">
          {filtered.map((q, i) => {
            const isExpanded = expandedQ === i;
            return (
              <div
                key={i}
                className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedQ(isExpanded ? null : i)}
                  className="w-full px-4 py-3 flex items-start justify-between text-left hover:bg-neutral-800/30 transition-colors"
                >
                  <div className="flex-1 pr-3">
                    <p className="text-sm text-neutral-100 font-medium">
                      {q.pregunta}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] px-2 py-0.5 bg-neutral-800 rounded-full text-neutral-400">
                        {CATEGORIA_LABELS[q.categoria] || q.categoria}
                      </span>
                      <span
                        className={`text-[10px] ${
                          DIFICULTAD_COLORS[q.dificultad] || "text-neutral-400"
                        }`}
                      >
                        {q.dificultad}
                      </span>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-neutral-500 transition-transform flex-shrink-0 mt-1 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3 border-t border-neutral-800 pt-3">
                    <div>
                      <h4 className="text-xs font-medium text-green-400 mb-1">
                        Respuesta modelo:
                      </h4>
                      <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                        {q.respuestaModelo}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {q.conceptosClave.map((concepto, j) => (
                        <span
                          key={j}
                          className="px-2 py-0.5 text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full"
                        >
                          {concepto}
                        </span>
                      ))}
                    </div>

                    <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
                      <p className="text-xs text-amber-300">
                        <span className="font-medium">Consejo:</span>{" "}
                        {q.consejo}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
