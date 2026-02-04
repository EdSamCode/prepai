"use client";

import type { NivelUsuario } from "@/lib/types";

const NIVELES: { value: NivelUsuario; label: string; desc: string }[] = [
  {
    value: "principiante",
    label: "Principiante",
    desc: "Sin experiencia previa. Empiezo desde cero.",
  },
  {
    value: "intermedio",
    label: "Intermedio",
    desc: "Conozco los fundamentos. Quiero profundizar.",
  },
  {
    value: "avanzado",
    label: "Avanzado",
    desc: "Tengo experiencia. Busco especializarme.",
  },
];

interface LevelSelectorProps {
  nivel: NivelUsuario;
  onChange: (nivel: NivelUsuario) => void;
}

export default function LevelSelector({ nivel, onChange }: LevelSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-neutral-300">
        Tu nivel actual
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {NIVELES.map((n) => (
          <button
            key={n.value}
            type="button"
            onClick={() => onChange(n.value)}
            className={`p-4 rounded-xl border text-left transition-all ${
              nivel === n.value
                ? "border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/50"
                : "border-neutral-800 bg-neutral-900 hover:border-neutral-700"
            }`}
          >
            <p
              className={`font-semibold text-sm ${
                nivel === n.value ? "text-indigo-400" : "text-neutral-200"
              }`}
            >
              {n.label}
            </p>
            <p className="text-xs text-neutral-500 mt-1">{n.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
