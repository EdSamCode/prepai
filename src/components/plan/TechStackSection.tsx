import type { TechStackItem } from "@/lib/types";
import SectionWrapper from "./SectionWrapper";

const PRIORIDAD_COLORS: Record<string, string> = {
  critica: "bg-red-500/10 text-red-400 border-red-500/20",
  importante: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  deseable: "bg-green-500/10 text-green-400 border-green-500/20",
};

const CATEGORIA_LABELS: Record<string, string> = {
  lenguaje: "Lenguaje",
  framework: "Framework",
  herramienta: "Herramienta",
  base_datos: "Base de Datos",
  cloud: "Cloud",
  otro: "Otro",
};

interface TechStackSectionProps {
  techStack: TechStackItem[];
}

export default function TechStackSection({ techStack }: TechStackSectionProps) {
  return (
    <SectionWrapper
      icon={
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      }
      titulo="Tech Stack"
      subtitulo={`${techStack.length} tecnologias identificadas`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {techStack.map((tech, i) => (
          <div
            key={i}
            className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-neutral-100">{tech.nombre}</h3>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                  PRIORIDAD_COLORS[tech.prioridad] || PRIORIDAD_COLORS.deseable
                }`}
              >
                {tech.prioridad}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 bg-neutral-800 rounded-full text-neutral-400">
                {CATEGORIA_LABELS[tech.categoria] || tech.categoria}
              </span>
              <span className="text-xs text-neutral-600">
                Nivel: {tech.nivelRequerido}
              </span>
            </div>
            <p className="text-sm text-neutral-400">{tech.descripcion}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
