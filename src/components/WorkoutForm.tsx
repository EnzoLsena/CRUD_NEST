import React, { useState } from 'react';
import { Plus, Minus, Save } from 'lucide-react';
import { Exercise, Workout } from '../types/workout';

interface WorkoutFormProps {
  initialData?: Workout;
  onSubmit: (data: Omit<Workout, 'id'> | Workout) => Promise<void>;
  onCancel: () => void;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Omit<Workout, 'id'> | Workout>({
    id: initialData?.id ?? '',
    nome: initialData?.nome ?? '',
    descricao: initialData?.descricao ?? '',
    diaSemana: initialData?.diaSemana ?? 'Segunda',
    exercicios: initialData?.exercicios ?? []
  });

  const addExercise = () => {
    setFormData(prev => ({
      ...prev,
      exercicios: [...prev.exercicios, {
        nome: '',
        series: 3,
        repeticoes: 12,
        peso: 0,
        observacoes: ''
      }]
    }));
  };

  const removeExercise = (index: number) => {
    setFormData(prev => ({
      ...prev,
      exercicios: prev.exercicios.filter((_, i) => i !== index)
    }));
  };

  const updateExercise = (index: number, field: keyof Exercise, value: any) => {
    setFormData(prev => ({
      ...prev,
      exercicios: prev.exercicios.map((ex, i) => 
        i === index ? { ...ex, [field]: value } : ex
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Treino</label>
        <input
          type="text"
          value={formData.nome}
          onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          value={formData.descricao}
          onChange={e => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dia da Semana</label>
        <select
          value={formData.diaSemana}
          onChange={e => setFormData(prev => ({ ...prev, diaSemana: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map(dia => (
            <option key={dia} value={dia}>{dia}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Exercícios</h3>
          <button
            type="button"
            onClick={addExercise}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
            Adicionar Exercício
          </button>
        </div>

        {formData.exercicios.map((exercicio, index) => (
          <div key={index} className="border p-4 rounded-md space-y-4">
            <div className="flex justify-between">
              <h4 className="font-medium">Exercício {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeExercise(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={exercicio.nome}
                  onChange={e => updateExercise(index, 'nome', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Séries</label>
                <input
                  type="number"
                  value={exercicio.series}
                  onChange={e => updateExercise(index, 'series', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Repetições</label>
                <input
                  type="number"
                  value={exercicio.repeticoes}
                  onChange={e => updateExercise(index, 'repeticoes', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Peso (kg)</label>
                <input
                  type="number"
                  value={exercicio.peso}
                  onChange={e => updateExercise(index, 'peso', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  step="0.5"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">Observações</label>
                <textarea
                  value={exercicio.observacoes}
                  onChange={e => updateExercise(index, 'observacoes', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Save className="w-4 h-4" />
          Salvar
        </button>
      </div>
    </form>
  );
};