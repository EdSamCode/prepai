"use client";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({ value, onChange }: TextInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-neutral-300">
          Texto de la oferta
        </label>
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            Limpiar
          </button>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pega aqui el texto de la oferta laboral, convocatoria o descripcion del examen..."
        className="w-full min-h-[200px] bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-neutral-100 placeholder-neutral-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-y text-sm leading-relaxed"
      />
      <p className="text-xs text-neutral-600 text-right">
        {value.length} caracteres
      </p>
    </div>
  );
}
