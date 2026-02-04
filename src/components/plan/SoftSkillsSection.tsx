import type { HabilidadBlanda } from "@/lib/types";
import SectionWrapper from "./SectionWrapper";

interface SoftSkillsSectionProps {
  softSkills: HabilidadBlanda[];
}

export default function SoftSkillsSection({
  softSkills,
}: SoftSkillsSectionProps) {
  return (
    <SectionWrapper
      icon={
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      }
      titulo="Habilidades Blandas"
      subtitulo="Competencias no tecnicas que marcan la diferencia"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {softSkills.map((skill, i) => (
          <div
            key={i}
            className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-neutral-100">{skill.nombre}</h3>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  skill.importancia === "alta"
                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                    : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                }`}
              >
                {skill.importancia === "alta" ? "Alta" : "Media"}
              </span>
            </div>

            <p className="text-sm text-neutral-400">{skill.descripcion}</p>

            <div>
              <h4 className="text-xs font-medium text-neutral-300 mb-1.5">
                Como desarrollar:
              </h4>
              <ol className="space-y-1">
                {skill.comoDesarrollar.map((paso, j) => (
                  <li
                    key={j}
                    className="text-xs text-neutral-500 flex items-start gap-2"
                  >
                    <span className="text-indigo-400 font-medium flex-shrink-0">
                      {j + 1}.
                    </span>
                    {paso}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3">
              <p className="text-xs text-purple-300">
                <span className="font-medium">En entrevista:</span>{" "}
                {skill.ejemploEntrevista}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
