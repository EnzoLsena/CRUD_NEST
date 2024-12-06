import { create } from 'zustand';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  login: (cpf: string) => void;
  logout: () => void;
}

// Simulated user database
const users: User[] = [
  {
    name: 'Admin User',
    age: 35,
    gender: 'M',
    cpf: '123.456.789-00',
    salary: 8000,
    role: 'admin'
  },
  {
    name: 'Personal Trainer',
    age: 28,
    gender: 'F',
    cpf: '987.654.321-00',
    salary: 4000,
    role: 'trainer'
  },
  {
    name: 'Student',
    age: 25,
    gender: 'M',
    cpf: '111.222.333-44',
    role: 'student'
  }
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (cpf: string) => {
    const user = users.find(u => u.cpf === cpf);
    if (user) {
      set({ user });
    } else {
      throw new Error('Invalid CPF');
    }
  },
  logout: () => set({ user: null })
}));