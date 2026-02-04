import type { TimelineEstimado } from "@/lib/types";
import SectionWrapper from "./SectionWrapper";

interface TimelineSectionProps {
  timeline: TimelineEstimado;
}

export default function TimelineSection({ timeline }: TimelineSectionProps) {
  const totalWeeks = timeline.duracionTotalSemanas;

  return (
    <SectionWrapper
      icon={
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }
      titulo="Timeline Estimado"
      subtitulo={`${totalWeeks} semanas totales - ${timeline.horasSemanalesRecomendadas} horas/semana`}
    >
      <div className="space-y-4">
        {/* Timeline bar */}
        <div className="space-y-2">
          {timeline.fases.map((fase, i) => {
            const startPct = ((fase.semanaInicio - 1) / totalWeeks) * 100;
            const widthPct =
              ((fase.semanaFin - fase.semanaInicio + 1) / totalWeeks) * 100;
            const colors = [
              "bg-indigo-500",
              "bg-purple-500",
              "bg-blue-500",
              "bg-cyan-500",
              "bg-emerald-500",
              "bg-amber-500",
            ];

            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-32 sm:w-40 text-xs text-neutral-400 truncate flex-shrink-0">
                  {fase.nombre}
                </div>
                <div className="flex-1 bg-neutral-800 rounded-full h-6 relative">
                  <div
                    className={`absolute h-full rounded-full ${
                      colors[i % colors.length]
                    } opacity-80 flex items-center justify-center`}
                    style={{
                      left: `${startPct}%`,
                      width: `${widthPct}%`,
                      minWidth: "40px",
                    }}
                  >
                    <span className="text-[10px] text-white font-medium px-1 truncate">
                      S{fase.semanaInicio}-{fase.semanaFin}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-indigo-400">
              {timeline.duracionTotalSemanas}
            </p>
            <p className="text-xs text-neutral-500">semanas</p>
          </div>
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-purple-400">
              {timeline.horasSemanalesRecomendadas}
            </p>
            <p className="text-xs text-neutral-500">horas/semana</p>
          </div>
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-center col-span-2 sm:col-span-1">
            <p className="text-2xl font-bold text-cyan-400">
              {timeline.duracionTotalSemanas * timeline.horasSemanalesRecomendadas}
            </p>
            <p className="text-xs text-neutral-500">horas totales</p>
          </div>
        </div>

        {/* Personalized note */}
        <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4">
          <p className="text-sm text-indigo-300">{timeline.notaPersonalizada}</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
