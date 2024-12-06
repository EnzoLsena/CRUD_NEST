export interface Exercise {
  id?: string;
  nome: string;
  series: number;
  repeticoes: number;
  peso?: number;
  observacoes?: string;
}

export interface Workout {
  id: string;
  nome: string;
  descricao: string;
  diaSemana: string;
  exercicios: Exercise[];
  criadoPor?: string;
}