import axios from 'axios';
import { Workout } from '../types/workout';

const api = axios.create({
  baseURL: 'http://localhost/api'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (cpf: string) => {
  const response = await api.post('/login', { cpf });
  return response.data;
};

export const getWorkouts = async () => {
  const response = await api.get<Workout[]>('/workouts');
  return response.data;
};

export const createWorkout = async (workout: Omit<Workout, 'id'>) => {
  const response = await api.post<{ id: string; message: string }>('/workouts', workout);
  return response.data;
};

export const updateWorkout = async (workout: Workout) => {
  const response = await api.put<{ message: string }>('/workouts', workout);
  return response.data;
};

export const deleteWorkout = async (id: string) => {
  const response = await api.delete<{ message: string }>(`/workouts?id=${id}`);
  return response.data;
};