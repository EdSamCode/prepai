"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { PlanCompleto } from "@/lib/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import ExportButton from "@/components/ExportButton";
import PlanView from "@/components/PlanView";

export default function ResultadoPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<PlanCompleto | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("prepai-plan");
    if (stored) {
      try {
        setPlan(JSON.parse(stored));
      } catch {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-neutral-500">Cargando plan...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6 no-print">
          <BackButton />
          <ExportButton />
        </div>

        <PlanView plan={plan} />
      </main>

      <Footer />
    </div>
  );
}
