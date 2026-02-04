"use client";

import { useState } from "react";
import type { PreguntaEvaluacion } from "@/lib/types";
import SectionWrapper from "./SectionWrapper";

interface AssessmentSectionProps {
  evaluacion: PreguntaEvaluacion[];
}

export default function AssessmentSection({
  evaluacion,
}: AssessmentSectionProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answeredCount, setAnsweredCount] = useState(0);

  const question = evaluacion[currentQ];

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelectedOption(index);
  };

  const handleReveal = () => {
    if (selectedOption === null) return;
    setRevealed(true);
    if (selectedOption === question.respuestaCorrecta) {
      setScore((s) => s + 1);
    }
    setAnsweredCount((c) => c + 1);
  };

  const handleNext = () => {
    if (currentQ < evaluacion.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelectedOption(null);
      setRevealed(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    const percentage = Math.round((score / evaluacion.length) * 100);
    return (
      <SectionWrapper
        icon={
          <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        titulo="Autoevaluacion"
        subtitulo="Resultado final"
      >
        <div className="text-center py-6 space-y-4">
          <div className="text-5xl font-bold">
            <span className={percentage >= 60 ? "text-green-400" : "text-amber-400"}>
              {score}
            </span>
            <span className="text-neutral-600">/{evaluacion.length}</span>
          </div>
          <p className="text-neutral-400">
            {percentage >= 80
              ? "Excelente! Tienes una base solida."
              : percentage >= 60
              ? "Buen nivel! Hay areas para mejorar."
              : "Necesitas reforzar algunos temas. El roadmap te ayudara."}
          </p>
          <button
            type="button"
            onClick={() => {
              setCurrentQ(0);
              setSelectedOption(null);
              setRevealed(false);
              setScore(0);
              setAnsweredCount(0);
              setCompleted(false);
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Reintentar
          </button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      icon={
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
      titulo="Autoevaluacion"
      subtitulo={`Pregunta ${currentQ + 1} de ${evaluacion.length} | ${score}/${answeredCount} correctas`}
    >
      <div className="space-y-4">
        {/* Progress bar */}
        <div className="w-full bg-neutral-800 rounded-full h-1.5">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all"
            style={{
              width: `${((currentQ + 1) / evaluacion.length) * 100}%`,
            }}
          />
        </div>

        {/* Question */}
        <div>
          <span className="text-[10px] px-2 py-0.5 bg-neutral-800 rounded-full text-neutral-400 mb-2 inline-block">
            {question.tecnologia}
          </span>
          <p className="text-neutral-100 font-medium">{question.pregunta}</p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {question.opciones.map((opcion, i) => {
            let optionStyle = "border-neutral-800 bg-neutral-950 hover:border-neutral-700";

            if (revealed) {
              if (i === question.respuestaCorrecta) {
                optionStyle = "border-green-500 bg-green-500/10";
              } else if (i === selectedOption) {
                optionStyle = "border-red-500 bg-red-500/10";
              }
            } else if (selectedOption === i) {
              optionStyle = "border-indigo-500 bg-indigo-500/10";
            }

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelect(i)}
                disabled={revealed}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${optionStyle} ${
                  revealed ? "cursor-default" : "cursor-pointer"
                }`}
              >
                <span className="text-neutral-300">{opcion}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4">
            <p className="text-sm text-indigo-300">{question.explicacion}</p>
          </div>
        )}

        {/* Action button */}
        <div className="flex justify-end">
          {!revealed ? (
            <button
              type="button"
              onClick={handleReveal}
              disabled={selectedOption === null}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Verificar
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {currentQ < evaluacion.length - 1
                ? "Siguiente"
                : "Ver resultado"}
            </button>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
