import type { ProyectoPractica } from "@/lib/types";
import SectionWrapper from "./SectionWrapper";

const DIFICULTAD_COLORS: Record<string, string> = {
  facil: "bg-green-500/10 text-green-400 border-green-500/20",
  medio: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  dificil: "bg-red-500/10 text-red-400 border-red-500/20",
};

interface ProjectsSectionProps {
  proyectos: ProyectoPractica[];
}

export default function ProjectsSection({ proyectos }: ProjectsSectionProps) {
  return (
    <SectionWrapper
      icon={
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      }
      titulo="Proyectos de Practica"
      subtitulo={`${proyectos.length} proyectos para tu portafolio`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {proyectos.map((proyecto, i) => (
          <div
            key={i}
            className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-3"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-neutral-100">
                {proyecto.nombre}
              </h3>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full border flex-shrink-0 ml-2 ${
                  DIFICULTAD_COLORS[proyecto.dificultad] ||
                  DIFICULTAD_COLORS.medio
                }`}
              >
                {proyecto.dificultad}
              </span>
            </div>

            <p className="text-sm text-neutral-400">{proyecto.descripcion}</p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {proyecto.tecnologias.map((tech, j) => (
                <span
                  key={j}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Features */}
            <div>
              <h4 className="text-xs font-medium text-neutral-300 mb-1.5">
                Funcionalidades:
              </h4>
              <ul className="space-y-1">
                {proyecto.funcionalidades.map((f, j) => (
                  <li
                    key={j}
                    className="text-xs text-neutral-500 flex items-start gap-1.5"
                  >
                    <span className="text-indigo-400 mt-0.5">&#8226;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Success Criteria */}
            <div>
              <h4 className="text-xs font-medium text-neutral-300 mb-1.5">
                Criterios de exito:
              </h4>
              <ul className="space-y-1">
                {proyecto.criteriosExito.map((c, j) => (
                  <li
                    key={j}
                    className="text-xs text-neutral-500 flex items-start gap-1.5"
                  >
                    <svg className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
              <span className="text-xs text-neutral-600">
                {proyecto.tiempoEstimado}
              </span>
              <span className="text-xs text-indigo-400/80">
                {proyecto.relevanciaLaboral}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
