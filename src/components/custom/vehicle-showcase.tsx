'use client';

import { Car, Bike, Truck, Bus, Tractor, Zap } from 'lucide-react';

export function VehicleShowcase() {
  const vehicles = [
    {
      category: 'Carros de Passeio',
      icon: Car,
      types: ['Sedan', 'Hatch', 'SUV', 'Crossover', 'Minivan', 'Esportivo'],
      color: 'from-blue-400 to-cyan-500',
    },
    {
      category: 'Motocicletas',
      icon: Bike,
      types: ['Street', 'Sport', 'Touring', 'Off-road', 'Scooter', 'Custom'],
      color: 'from-purple-400 to-pink-500',
    },
    {
      category: 'Veículos Comerciais',
      icon: Truck,
      types: ['Caminhão', 'Caminhonete', 'Van', 'Furgão', 'Utilitário', 'Reboque'],
      color: 'from-orange-400 to-red-500',
    },
    {
      category: 'Transporte Coletivo',
      icon: Bus,
      types: ['Ônibus', 'Micro-ônibus', 'Van Escolar', 'Transporte Turístico'],
      color: 'from-green-400 to-emerald-500',
    },
    {
      category: 'Máquinas Agrícolas',
      icon: Tractor,
      types: ['Trator', 'Colheitadeira', 'Plantadeira', 'Pulverizador', 'Retroescavadeira'],
      color: 'from-yellow-400 to-orange-500',
    },
    {
      category: 'Veículos Elétricos',
      icon: Zap,
      types: ['Carro Elétrico', 'Moto Elétrica', 'Patinete', 'Bicicleta Elétrica', 'Híbrido'],
      color: 'from-cyan-400 to-blue-500',
    },
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Do Patinete à
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Máquina Agrícola
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Nossa tecnologia de IA é treinada para diagnosticar qualquer veículo terrestre com precisão profissional
          </p>
        </div>

        {/* Vehicle Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${vehicle.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <vehicle.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {vehicle.category}
                  </h3>
                </div>
              </div>
              <div className="space-y-2">
                {vehicle.types.map((type, typeIndex) => (
                  <div
                    key={typeIndex}
                    className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
