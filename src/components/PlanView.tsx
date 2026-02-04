import type { PlanCompleto } from "@/lib/types";
import TechStackSection from "./plan/TechStackSection";
import TimelineSection from "./plan/TimelineSection";
import RoadmapSection from "./plan/RoadmapSection";
import ResourcesSection from "./plan/ResourcesSection";
import ProjectsSection from "./plan/ProjectsSection";
import InterviewSection from "./plan/InterviewSection";
import AssessmentSection from "./plan/AssessmentSection";
import SoftSkillsSection from "./plan/SoftSkillsSection";

interface PlanViewProps {
  plan: PlanCompleto;
}

export default function PlanView({ plan }: PlanViewProps) {
  return (
    <div id="plan-content" className="space-y-6">
      {/* Summary Card */}
      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-100">
              {plan.resumen.titulo}
            </h1>
            <p className="text-indigo-400 font-medium mt-1">
              {plan.resumen.empresa}
            </p>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              {plan.resumen.descripcionBreve}
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-col gap-2 sm:items-end flex-shrink-0">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-800 text-neutral-300">
              {plan.resumen.tipo}
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {plan.resumen.nivelRequerido}
            </span>
            {plan.resumen.salarioEstimado && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                {plan.resumen.salarioEstimado}
              </span>
            )}
          </div>
        </div>
      </div>

      <TechStackSection techStack={plan.techStack} />
      <TimelineSection timeline={plan.timeline} />
      <RoadmapSection roadmap={plan.roadmap} />
      <ResourcesSection recursos={plan.recursos} />
      <ProjectsSection proyectos={plan.proyectos} />
      <InterviewSection entrevista={plan.entrevista} />
      <AssessmentSection evaluacion={plan.evaluacion} />
      <SoftSkillsSection softSkills={plan.softSkills} />
    </div>
  );
}
