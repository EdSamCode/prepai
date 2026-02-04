"use client";

import { useState } from "react";
import type { FaseRoadmap } from "@/lib/types";
import SectionWrapper from "./SectionWrapper";

interface RoadmapSectionProps {
  roadmap: FaseRoadmap[];
  titulo: string;
  subtitulo: string;
}

export default function RoadmapSection({ roadmap, titulo, subtitulo }: RoadmapSectionProps) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);

  return (
    <SectionWrapper
      icon={
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      }
      titulo={titulo}
      subtitulo={`${roadmap.length} ${subtitulo.toLowerCase()}`}
    >
      <div className="space-y-3">
        {roadmap.map((fase, i) => {
          const isExpanded = expandedPhase === i;
          return (
            <div
              key={i}
              className="bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedPhase(isExpanded ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {fase.numero}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 text-sm">
                      {fase.titulo}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {fase.duracionSemanas} semanas
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-neutral-500 transition-transform ${
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
                <div className="px-5 pb-5 space-y-4 border-t border-neutral-800">
                  {/* Topics */}
                  <div className="pt-4">
                    <div className="flex flex-wrap gap-2">
                      {fase.temas.map((tema, j) => (
                        <span
                          key={j}
                          className="px-2.5 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                        >
                          {tema}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Objectives */}
                  <div>
                    <h4 className="text-sm font-medium text-neutral-300 mb-2">
                      Objetivos
                    </h4>
                    <ul className="space-y-1.5">
                      {fase.objetivos.map((obj, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-neutral-400">
                          <span className="text-indigo-400 mt-1 flex-shrink-0">&#8226;</span>
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Milestones */}
                  <div>
                    <h4 className="text-sm font-medium text-neutral-300 mb-2">
                      Hitos
                    </h4>
                    <ul className="space-y-1.5">
                      {fase.hitos.map((hito, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-neutral-400">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {hito}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
