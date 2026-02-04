"use client";

import { useEffect, useState } from "react";

const ROTATING_TEXTS = [
  "gran salto profesional",
  "proximo examen",
  "dominar cualquier tema",
  "aprender algo nuevo",
  "conseguir ese empleo",
  "aprobar con excelencia",
  "destacar en tu carrera",
  "estudiar a profundidad",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
        setIsAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-5 py-10">
      <h1 className="text-3xl sm:text-5xl font-bold text-neutral-100 leading-tight">
        Prepara tu{" "}
        <span
          className={`inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 transition-all duration-400 ${
            isAnimating
              ? "opacity-0 translate-y-4 blur-sm"
              : "opacity-100 translate-y-0 blur-0"
          }`}
        >
          {ROTATING_TEXTS[currentIndex]}
        </span>
      </h1>

      <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
        Pega un texto, sube una imagen o un PDF de cualquier oferta laboral,
        temario de examen, libro o tema de estudio. La IA creara un{" "}
        <span className="text-neutral-200 font-medium">
          plan de preparacion completo
        </span>{" "}
        y personalizado para ti.
      </p>

      <div className="flex flex-wrap justify-center gap-2 pt-2">
        {["Empleos", "Examenes", "Libros", "Ensayos", "Certificaciones", "Oposiciones"].map(
          (tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-800/50 text-neutral-500 border border-neutral-800"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </div>
  );
}
