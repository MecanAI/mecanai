'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Car, Bike, Truck, Tractor, X } from 'lucide-react';

interface VehicleFormProps {
  onSubmit: (data: VehicleData) => void;
  onClose: () => void;
}

export interface VehicleData {
  type: string;
  brand: string;
  model: string;
  year: string;
  engine: string;
  transmission: string;
  fuel: string;
  mileage: string;
}

export function VehicleForm({ onSubmit, onClose }: VehicleFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<VehicleData>({
    type: '',
    brand: '',
    model: '',
    year: '',
    engine: '',
    transmission: '',
    fuel: '',
    mileage: '',
  });

  const vehicleTypes = [
    { id: 'car', name: 'Carro', icon: Car },
    { id: 'motorcycle', name: 'Moto', icon: Bike },
    { id: 'truck', name: 'Caminhão', icon: Truck },
    { id: 'tractor', name: 'Trator/Máquina', icon: Tractor },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-orange-500 p-6 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Especificações do Veículo
            </h2>
            <p className="text-white/90 text-sm mt-1">
              Quanto mais detalhes, mais preciso será o diagnóstico
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tipo de Veículo */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Tipo de Veículo *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {vehicleTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.id })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.type === type.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                  }`}
                >
                  <type.icon className={`w-8 h-8 mx-auto mb-2 ${
                    formData.type === type.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    formData.type === type.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {type.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Marca */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Marca *
            </label>
            <input
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="Ex: Toyota, Honda, Volkswagen..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Modelo */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Modelo *
            </label>
            <input
              type="text"
              required
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              placeholder="Ex: Corolla, Civic, Gol..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Ano e Motor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Ano *
              </label>
              <input
                type="text"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="Ex: 2020"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Motor *
              </label>
              <input
                type="text"
                required
                value={formData.engine}
                onChange={(e) => setFormData({ ...formData, engine: e.target.value })}
                placeholder="Ex: 1.8, 2.0 Turbo..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Câmbio e Combustível */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Câmbio *
              </label>
              <select
                required
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
              >
                <option value="">Selecione...</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automático</option>
                <option value="cvt">CVT</option>
                <option value="automated">Automatizado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Combustível *
              </label>
              <select
                required
                value={formData.fuel}
                onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
              >
                <option value="">Selecione...</option>
                <option value="gasoline">Gasolina</option>
                <option value="ethanol">Etanol</option>
                <option value="flex">Flex</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Elétrico</option>
                <option value="hybrid">Híbrido</option>
              </select>
            </div>
          </div>

          {/* Quilometragem */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Quilometragem (km) *
            </label>
            <input
              type="text"
              required
              value={formData.mileage}
              onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
              placeholder="Ex: 50000"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Botões */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Continuar Diagnóstico
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
