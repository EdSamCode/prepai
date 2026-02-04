export type NivelUsuario = "principiante" | "intermedio" | "avanzado";

export type TipoContenido =
  | "empleo"
  | "examen"
  | "libro"
  | "certificacion"
  | "tema_general";

export interface AnalysisRequest {
  tipo: "texto" | "imagen";
  contenido: string;
  nivel: NivelUsuario;
}

export interface PlanCompleto {
  tipoContenido: TipoContenido;
  resumen: ResumenContenido;
  temasClave: TemaClaveItem[];
  roadmap: FaseRoadmap[];
  recursos: RecursoGratuito[];
  ejercicios: EjercicioPractico[];
  preguntas: PreguntaProfundizacion[];
  timeline: TimelineEstimado;
  evaluacion: PreguntaEvaluacion[];
  habilidades: HabilidadDesarrollar[];
}

export interface ResumenContenido {
  titulo: string;
  autorFuente: string;
  tipo: string;
  descripcionBreve: string;
  nivelRequerido: string;
  metaFinal: string;
}

export interface TemaClaveItem {
  nombre: string;
  categoria: string;
  prioridad: "critica" | "importante" | "deseable";
  descripcion: string;
  nivelRequerido: string;
}

export interface FaseRoadmap {
  numero: number;
  titulo: string;
  duracionSemanas: number;
  objetivos: string[];
  hitos: string[];
  temas: string[];
}

export interface RecursoGratuito {
  nombre: string;
  tipo: "curso" | "tutorial" | "documentacion" | "video" | "libro" | "practica" | "articulo" | "audio";
  url: string;
  plataforma: string;
  idioma: "es" | "en";
  descripcion: string;
  duracionEstimada: string;
  temaRelacionado: string;
}

export interface EjercicioPractico {
  nombre: string;
  descripcion: string;
  dificultad: "facil" | "medio" | "dificil";
  temas: string[];
  queFuncionalidades: string[];
  criteriosExito: string[];
  tiempoEstimado: string;
  porQueImportante: string;
}

export interface PreguntaProfundizacion {
  pregunta: string;
  categoria: string;
  dificultad: "facil" | "medio" | "dificil";
  respuestaModelo: string;
  conceptosClave: string[];
  consejo: string;
}

export interface TimelineEstimado {
  duracionTotalSemanas: number;
  horasSemanalesRecomendadas: number;
  fases: {
    nombre: string;
    semanaInicio: number;
    semanaFin: number;
  }[];
  notaPersonalizada: string;
}

export interface PreguntaEvaluacion {
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  explicacion: string;
  tema: string;
}

export interface HabilidadDesarrollar {
  nombre: string;
  importancia: "alta" | "media";
  descripcion: string;
  comoDesarrollar: string[];
  ejemploPractico: string;
}

// ============================================
// Labels contextuales segun tipo de contenido
// ============================================
export interface ContextLabels {
  temasClaveTitle: string;
  temasClaveSubtitle: string;
  roadmapTitle: string;
  roadmapSubtitle: string;
  ejerciciosTitle: string;
  ejerciciosSubtitle: string;
  preguntasTitle: string;
  preguntasSubtitle: string;
  habilidadesTitle: string;
  habilidadesSubtitle: string;
  habilidadEjemploLabel: string;
}

export function getContextLabels(tipo: TipoContenido): ContextLabels {
  switch (tipo) {
    case "empleo":
      return {
        temasClaveTitle: "Tech Stack y Competencias",
        temasClaveSubtitle: "Tecnologias y habilidades requeridas",
        roadmapTitle: "Roadmap de Preparacion",
        roadmapSubtitle: "Tu camino para conseguir el empleo",
        ejerciciosTitle: "Proyectos de Practica",
        ejerciciosSubtitle: "Proyectos para tu portafolio",
        preguntasTitle: "Preguntas de Entrevista",
        preguntasSubtitle: "Preguntas con respuestas modelo",
        habilidadesTitle: "Habilidades Blandas",
        habilidadesSubtitle: "Competencias que buscan los reclutadores",
        habilidadEjemploLabel: "En entrevista:",
      };
    case "libro":
      return {
        temasClaveTitle: "Temas y Conceptos Clave",
        temasClaveSubtitle: "Lo que necesitas dominar de esta obra",
        roadmapTitle: "Plan de Lectura y Estudio",
        roadmapSubtitle: "Fases para dominar el contenido",
        ejerciciosTitle: "Ejercicios de Comprension",
        ejerciciosSubtitle: "Actividades para profundizar tu entendimiento",
        preguntasTitle: "Preguntas de Analisis",
        preguntasSubtitle: "Para demostrar dominio del contenido",
        habilidadesTitle: "Habilidades a Desarrollar",
        habilidadesSubtitle: "Competencias que fortaleceras con este estudio",
        habilidadEjemploLabel: "En la practica:",
      };
    case "examen":
      return {
        temasClaveTitle: "Temas del Examen",
        temasClaveSubtitle: "Materias y conceptos que debes dominar",
        roadmapTitle: "Plan de Estudio",
        roadmapSubtitle: "Fases para aprobar con excelencia",
        ejerciciosTitle: "Ejercicios de Practica",
        ejerciciosSubtitle: "Ejercicios tipo examen para practicar",
        preguntasTitle: "Preguntas de Examen",
        preguntasSubtitle: "Preguntas como las del examen real",
        habilidadesTitle: "Tecnicas de Estudio",
        habilidadesSubtitle: "Habilidades clave para aprobar",
        habilidadEjemploLabel: "En el examen:",
      };
    case "certificacion":
      return {
        temasClaveTitle: "Dominios de Conocimiento",
        temasClaveSubtitle: "Areas que cubre la certificacion",
        roadmapTitle: "Plan de Preparacion",
        roadmapSubtitle: "Tu camino a la certificacion",
        ejerciciosTitle: "Laboratorios y Practicas",
        ejerciciosSubtitle: "Ejercicios para dominar cada dominio",
        preguntasTitle: "Preguntas de Certificacion",
        preguntasSubtitle: "Preguntas tipo examen de certificacion",
        habilidadesTitle: "Competencias Clave",
        habilidadesSubtitle: "Habilidades que valida esta certificacion",
        habilidadEjemploLabel: "En la practica profesional:",
      };
    case "tema_general":
    default:
      return {
        temasClaveTitle: "Conceptos Fundamentales",
        temasClaveSubtitle: "Lo esencial que debes comprender",
        roadmapTitle: "Ruta de Aprendizaje",
        roadmapSubtitle: "Fases para dominar el tema",
        ejerciciosTitle: "Ejercicios Practicos",
        ejerciciosSubtitle: "Actividades para afianzar conocimientos",
        preguntasTitle: "Preguntas de Comprension",
        preguntasSubtitle: "Para verificar que dominas el tema",
        habilidadesTitle: "Habilidades a Desarrollar",
        habilidadesSubtitle: "Competencias que adquiriras",
        habilidadEjemploLabel: "Aplicacion practica:",
      };
  }
}
