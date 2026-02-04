import { NextRequest, NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
import { buildSystemPrompt } from "@/lib/prompts";
import { extractBase64Data } from "@/lib/utils";
import type { NivelUsuario, PlanCompleto } from "@/lib/types";

const VALID_NIVELES: NivelUsuario[] = ["principiante", "intermedio", "avanzado"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contenido, nivel } = body;

    if (!contenido || typeof contenido !== "string") {
      return NextResponse.json(
        { error: "No se recibio el PDF." },
        { status: 400 }
      );
    }

    if (!nivel || !VALID_NIVELES.includes(nivel)) {
      return NextResponse.json(
        { error: "Nivel invalido. Usa: principiante, intermedio o avanzado." },
        { status: 400 }
      );
    }

    if (!contenido.startsWith("data:application/pdf")) {
      return NextResponse.json(
        { error: "El archivo no es un PDF valido." },
        { status: 400 }
      );
    }

    // Extract base64 data from data URL
    const base64Data = extractBase64Data(contenido);

    // Send PDF directly to Gemini (it supports PDFs natively as inlineData)
    // This avoids using pdf-parse which requires Node.js fs module and fails on Vercel
    const systemPrompt = buildSystemPrompt(nivel);
    const userPromptText = `Analiza el contenido de este PDF y genera el plan de preparacion completo en formato JSON.
Detecta automaticamente si es una oferta laboral, temario de examen, libro, certificacion u otro tipo de material y adapta el plan en consecuencia.

Recuerda: devuelve UNICAMENTE el JSON valido, sin texto adicional.`;

    const planResult = await geminiModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "application/pdf",
                data: base64Data,
              },
            },
            { text: userPromptText },
          ],
        },
      ],
      systemInstruction: { role: "user", parts: [{ text: systemPrompt }] },
    });

    const responseText = planResult.response.text();

    let plan: PlanCompleto;
    try {
      plan = JSON.parse(responseText) as PlanCompleto;
    } catch {
      // Retry once if JSON parsing fails
      const retryResult = await geminiModel.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  mimeType: "application/pdf",
                  data: base64Data,
                },
              },
              { text: userPromptText },
            ],
          },
        ],
        systemInstruction: { role: "user", parts: [{ text: systemPrompt }] },
      });

      plan = JSON.parse(retryResult.response.text()) as PlanCompleto;
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Error en /api/analizar-pdf:", error);

    const message =
      error instanceof Error ? error.message : "Error desconocido";

    if (message.includes("429") || message.includes("RESOURCE_EXHAUSTED")) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Espera un momento e intenta de nuevo." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Error al procesar el PDF. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
