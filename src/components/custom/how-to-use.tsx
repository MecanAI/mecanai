'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';

interface HowToUseProps {
  onClose: () => void;
}

export function HowToUse({ onClose }: HowToUseProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: '1. Especifique seu Veículo',
      description: 'Informe marca, modelo, ano e especificações técnicas do seu veículo para um diagnóstico mais preciso.',
      icon: '🚗',
    },
    {
      title: '2. Descreva o Problema',
      description: 'Conte o que está acontecendo: barulhos, luzes acesas, comportamento estranho, etc.',
      icon: '💬',
    },
    {
      title: '3. Envie Mídia (Opcional)',
      description: 'Tire fotos, grave vídeos ou áudios mostrando o problema em tempo real para análise mais detalhada.',
      icon: '📸',
    },
    {
      title: '4. Aguarde a Análise',
      description: '5 IAs especializadas analisarão simultaneamente seu caso em segundos.',
      icon: '🤖',
    },
    {
      title: '5. Receba o Diagnóstico',
      description: 'Veja problemas identificados, soluções recomendadas e estimativas de custo.',
      icon: '✅',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full">
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-white">Como Usar o MecanAI</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    index <= currentStep
                      ? 'bg-gradient-to-br from-blue-600 to-orange-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-12 mx-2 transition-all ${
                      index < currentStep
                        ? 'bg-gradient-to-r from-blue-600 to-orange-500'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Current Step */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{steps[currentStep].icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {steps[currentStep].description}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex space-x-4">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Anterior
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Próximo
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Começar Agora!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
