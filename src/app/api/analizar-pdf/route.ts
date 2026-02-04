import { NextRequest, NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompts";
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

    // Convert base64 to Buffer for pdf-parse
    const pdfBuffer = Buffer.from(base64Data, "base64");

    // Dynamic import pdf-parse
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require("pdf-parse");
    const pdfData = await pdfParse(pdfBuffer);

    const extractedText = pdfData.text?.trim();

    if (!extractedText || extractedText.length < 20) {
      return NextResponse.json(
        {
          error:
            "No se pudo extraer suficiente texto del PDF. Asegurate de que contenga texto legible (no escaneado como imagen).",
        },
        { status: 422 }
      );
    }

    // Truncate if too long (Gemini has token limits)
    const textToAnalyze =
      extractedText.length > 30000
        ? extractedText.substring(0, 30000) + "\n\n[... texto truncado ...]"
        : extractedText;

    // Generate plan from extracted text
    const systemPrompt = buildSystemPrompt(nivel);
    const userPrompt = buildUserPrompt(textToAnalyze);

    const planResult = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      systemInstruction: { role: "user", parts: [{ text: systemPrompt }] },
    });

    const responseText = planResult.response.text();

    let plan: PlanCompleto;
    try {
      plan = JSON.parse(responseText) as PlanCompleto;
    } catch {
      const retryResult = await geminiModel.generateContent({
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
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
