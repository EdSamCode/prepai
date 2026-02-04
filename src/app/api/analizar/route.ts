import { NextRequest, NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";
import type { NivelUsuario, PlanCompleto } from "@/lib/types";

const VALID_NIVELES: NivelUsuario[] = ["principiante", "intermedio", "avanzado"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contenido, nivel } = body;

    if (!contenido || typeof contenido !== "string" || contenido.trim().length < 10) {
      return NextResponse.json(
        { error: "El contenido de la oferta es muy corto o esta vacio." },
        { status: 400 }
      );
    }

    if (!nivel || !VALID_NIVELES.includes(nivel)) {
      return NextResponse.json(
        { error: "Nivel invalido. Usa: principiante, intermedio o avanzado." },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(nivel);
    const userPrompt = buildUserPrompt(contenido);

    const result = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      systemInstruction: { role: "user", parts: [{ text: systemPrompt }] },
    });

    const responseText = result.response.text();

    let plan: PlanCompleto;
    try {
      plan = JSON.parse(responseText) as PlanCompleto;
    } catch {
      // Retry once if parsing fails (shouldn't happen with responseMimeType: json)
      const retryResult = await geminiModel.generateContent({
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        systemInstruction: { role: "user", parts: [{ text: systemPrompt }] },
      });

      plan = JSON.parse(retryResult.response.text()) as PlanCompleto;
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Error en /api/analizar:", error);

    const message =
      error instanceof Error ? error.message : "Error desconocido";

    if (message.includes("429") || message.includes("RESOURCE_EXHAUSTED")) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Espera un momento e intenta de nuevo." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Error al generar el plan. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
