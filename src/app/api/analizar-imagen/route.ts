import { NextRequest, NextResponse } from "next/server";
import { geminiModel, geminiVisionModel } from "@/lib/gemini";
import {
  buildSystemPrompt,
  buildUserPrompt,
  IMAGE_OCR_PROMPT,
} from "@/lib/prompts";
import {
  extractBase64Data,
  getMediaTypeFromDataUrl,
  estimateBase64SizeMB,
} from "@/lib/utils";
import type { NivelUsuario, PlanCompleto } from "@/lib/types";

const VALID_NIVELES: NivelUsuario[] = ["principiante", "intermedio", "avanzado"];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contenido, nivel } = body;

    if (!contenido || typeof contenido !== "string") {
      return NextResponse.json(
        { error: "No se recibio la imagen." },
        { status: 400 }
      );
    }

    if (!nivel || !VALID_NIVELES.includes(nivel)) {
      return NextResponse.json(
        { error: "Nivel invalido. Usa: principiante, intermedio o avanzado." },
        { status: 400 }
      );
    }

    const mediaType = getMediaTypeFromDataUrl(contenido);
    if (!mediaType) {
      return NextResponse.json(
        { error: "Formato de imagen no soportado. Usa PNG, JPEG o WebP." },
        { status: 400 }
      );
    }

    const base64Data = extractBase64Data(contenido);
    const sizeMB = estimateBase64SizeMB(base64Data);
    if (sizeMB > 10) {
      return NextResponse.json(
        { error: "La imagen es muy grande. El maximo es 10MB." },
        { status: 400 }
      );
    }

    // Step 1: OCR - Extract text from image using Gemini Vision
    const ocrResult = await geminiVisionModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: mediaType,
                data: base64Data,
              },
            },
            { text: IMAGE_OCR_PROMPT },
          ],
        },
      ],
    });

    const extractedText = ocrResult.response.text();

    if (extractedText.includes("ERROR_NO_OFERTA")) {
      return NextResponse.json(
        {
          error:
            "La imagen no parece contener una oferta laboral o contenido academico. Intenta con otra imagen.",
        },
        { status: 422 }
      );
    }

    if (extractedText.trim().length < 20) {
      return NextResponse.json(
        {
          error:
            "No se pudo extraer suficiente texto de la imagen. Asegurate de que sea legible.",
        },
        { status: 422 }
      );
    }

    // Step 2: Generate plan from extracted text
    const systemPrompt = buildSystemPrompt(nivel);
    const userPrompt = buildUserPrompt(extractedText);

    const planResult = await geminiModel.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      systemInstruction: { role: "user", parts: [{ text: systemPrompt }] },
    });

    const responseText = planResult.response.text();

    let plan: PlanCompleto;
    try {
      plan = JSON.parse(responseText) as PlanCompleto;
    } catch {
      // Retry once
      const retryResult = await geminiModel.generateContent({
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        systemInstruction: { role: "user", parts: [{ text: systemPrompt }] },
      });

      plan = JSON.parse(retryResult.response.text()) as PlanCompleto;
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Error en /api/analizar-imagen:", error);

    const message =
      error instanceof Error ? error.message : "Error desconocido";

    if (message.includes("429") || message.includes("RESOURCE_EXHAUSTED")) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Espera un momento e intenta de nuevo." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Error al procesar la imagen. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
