import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Calendar, Plus, Edit2, Trash2 } from 'lucide-react';
import { Workout } from '../types/workout';
import { WorkoutForm } from '../components/WorkoutForm';
import { getWorkouts, createWorkout, updateWorkout, deleteWorkout } from '../services/api';

export const Dashboard = () => {
  const user = useAuthStore(state => state.user);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (error) {
      console.error('Error loading workouts:', error);
    }
  };

  const handleCreateWorkout = async (data: Omit<Workout, 'id'>) => {
    try {
      await createWorkout(data);
      await loadWorkouts();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  const handleUpdateWorkout = async (data: Workout) => {
    try {
      await updateWorkout(data);
      await loadWorkouts();
      setEditingWorkout(null);
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  const handleDeleteWorkout = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este treino?')) {
      try {
        await deleteWorkout(id);
        await loadWorkouts();
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Bem-vindo, {user?.name}
            </h1>
            {user?.role === 'trainer' && !isFormOpen && !editingWorkout && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Adicionar Treino
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        {(isFormOpen || editingWorkout) ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingWorkout ? 'Editar Treino' : 'Novo Treino'}
            </h2>
            <WorkoutForm
              initialData={editingWorkout ?? undefined}
              onSubmit={editingWorkout ? handleUpdateWorkout : handleCreateWorkout}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingWorkout(null);
              }}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <div key={workout.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold">{workout.diaSemana}</h2>
                  </div>
                  {user?.role === 'trainer' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingWorkout(workout)}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteWorkout(workout.id)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                <h3 className="font-medium text-lg mb-2">{workout.nome}</h3>
                <p className="text-gray-600 text-sm mb-4">{workout.descricao}</p>
                <ul className="space-y-3">
                  {workout.exercicios.map((exercise, idx) => (
                    <li key={idx} className="border-b pb-2">
                      <p className="font-medium">{exercise.nome}</p>
                      <p className="text-sm text-gray-600">
                        {exercise.series} séries x {exercise.repeticoes} repetições
                        {exercise.peso && ` - ${exercise.peso}kg`}
                      </p>
                      {exercise.observacoes && (
                        <p className="text-sm text-gray-500 mt-1">{exercise.observacoes}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};