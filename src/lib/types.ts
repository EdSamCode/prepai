export type NivelUsuario = "principiante" | "intermedio" | "avanzado";

export interface AnalysisRequest {
  tipo: "texto" | "imagen";
  contenido: string;
  nivel: NivelUsuario;
}

export interface PlanCompleto {
  resumen: ResumenOferta;
  techStack: TechStackItem[];
  roadmap: FaseRoadmap[];
  recursos: RecursoGratuito[];
  proyectos: ProyectoPractica[];
  entrevista: PreguntaEntrevista[];
  timeline: TimelineEstimado;
  evaluacion: PreguntaEvaluacion[];
  softSkills: HabilidadBlanda[];
}

export interface ResumenOferta {
  titulo: string;
  empresa: string;
  tipo: string;
  descripcionBreve: string;
  nivelRequerido: string;
  salarioEstimado?: string;
}

export interface TechStackItem {
  nombre: string;
  categoria:
    | "lenguaje"
    | "framework"
    | "herramienta"
    | "base_datos"
    | "cloud"
    | "otro";
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
  tecnologias: string[];
}

export interface RecursoGratuito {
  nombre: string;
  tipo: "curso" | "tutorial" | "documentacion" | "video" | "libro" | "practica";
  url: string;
  plataforma: string;
  idioma: "es" | "en";
  descripcion: string;
  duracionEstimada: string;
  tecnologiaRelacionada: string;
}

export interface ProyectoPractica {
  nombre: string;
  descripcion: string;
  dificultad: "facil" | "medio" | "dificil";
  tecnologias: string[];
  funcionalidades: string[];
  criteriosExito: string[];
  tiempoEstimado: string;
  relevanciaLaboral: string;
}

export interface PreguntaEntrevista {
  pregunta: string;
  categoria: "tecnica" | "comportamental" | "sistema" | "algoritmo";
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
  tecnologia: string;
}

export interface HabilidadBlanda {
  nombre: string;
  importancia: "alta" | "media";
  descripcion: string;
  comoDesarrollar: string[];
  ejemploEntrevista: string;
}
