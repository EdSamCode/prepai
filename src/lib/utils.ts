export function validateImageFormat(dataUrl: string): boolean {
  const validPrefixes = [
    "data:image/png",
    "data:image/jpeg",
    "data:image/jpg",
    "data:image/webp",
  ];
  return validPrefixes.some((prefix) => dataUrl.startsWith(prefix));
}

export function getMediaTypeFromDataUrl(
  dataUrl: string
): "image/png" | "image/jpeg" | "image/webp" | null {
  if (dataUrl.startsWith("data:image/png")) return "image/png";
  if (dataUrl.startsWith("data:image/jpeg") || dataUrl.startsWith("data:image/jpg"))
    return "image/jpeg";
  if (dataUrl.startsWith("data:image/webp")) return "image/webp";
  return null;
}

export function extractBase64Data(dataUrl: string): string {
  const commaIndex = dataUrl.indexOf(",");
  if (commaIndex === -1) return dataUrl;
  return dataUrl.substring(commaIndex + 1);
}

export function estimateBase64SizeMB(base64: string): number {
  const padding = (base64.match(/=+$/) || [""])[0].length;
  return (base64.length * 0.75 - padding) / (1024 * 1024);
}

export function parseJsonFromResponse(text: string): unknown {
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch {
    // Try extracting JSON from markdown code blocks
    const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
    if (jsonMatch?.[1]) {
      return JSON.parse(jsonMatch[1].trim());
    }

    // Try finding the first { ... } block
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return JSON.parse(text.substring(firstBrace, lastBrace + 1));
    }

    throw new Error("No se pudo extraer JSON valido de la respuesta");
  }
}

export const LOADING_MESSAGES = [
  "Analizando la oferta laboral...",
  "Identificando tecnologias requeridas...",
  "Evaluando nivel de dificultad...",
  "Generando roadmap personalizado...",
  "Buscando los mejores recursos gratuitos...",
  "Disenando proyectos de practica...",
  "Preparando preguntas de entrevista...",
  "Creando evaluacion de conocimientos...",
  "Finalizando tu plan de preparacion...",
];
