"use client";

import { useEffect, useState } from "react";
import { LOADING_MESSAGES } from "@/lib/utils";

export default function LoadingOverlay() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md mx-4 text-center space-y-6">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
          <div className="absolute inset-3 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-neutral-100 mb-2">
            Creando tu plan personalizado
          </h3>
          <p className="text-indigo-400 text-sm animate-pulse min-h-[20px]">
            {LOADING_MESSAGES[messageIndex]}
          </p>
        </div>

        <p className="text-neutral-600 text-xs">
          Esto puede tomar entre 15 y 30 segundos
        </p>
      </div>
    </div>
  );
}
