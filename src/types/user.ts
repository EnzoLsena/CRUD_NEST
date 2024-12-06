export type UserRole = 'admin' | 'trainer' | 'student';

export interface User {
  name: string;
  age: number;
  gender: string;
  cpf: string;
  salary?: number;
  role: UserRole;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  dayOfWeek: string;
  exercises: Exercise[];
  createdBy: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}