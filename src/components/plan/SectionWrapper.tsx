import type { ReactNode } from "react";

interface SectionWrapperProps {
  icon: ReactNode;
  titulo: string;
  subtitulo?: string;
  children: ReactNode;
}

export default function SectionWrapper({
  icon,
  titulo,
  subtitulo,
  children,
}: SectionWrapperProps) {
  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-bold text-neutral-100">{titulo}</h2>
          {subtitulo && (
            <p className="text-sm text-neutral-500 mt-0.5">{subtitulo}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}
