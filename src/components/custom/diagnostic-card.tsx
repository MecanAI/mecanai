'use client';

import { AlertTriangle, AlertCircle, Info, XCircle } from 'lucide-react';

interface Diagnostic {
  id: string;
  problem: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  solution: string;
  estimatedCost: string;
  aiModel: string;
  confidence: number;
}

interface DiagnosticCardProps {
  diagnostic: Diagnostic;
}

export function DiagnosticCard({ diagnostic }: DiagnosticCardProps) {
  const severityConfig = {
    low: {
      icon: Info,
      color: 'from-blue-400 to-cyan-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-700 dark:text-blue-300',
      label: 'Baixa',
    },
    medium: {
      icon: AlertCircle,
      color: 'from-yellow-400 to-orange-500',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-700 dark:text-yellow-300',
      label: 'Média',
    },
    high: {
      icon: AlertTriangle,
      color: 'from-orange-400 to-red-500',
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      border: 'border-orange-200 dark:border-orange-800',
      text: 'text-orange-700 dark:text-orange-300',
      label: 'Alta',
    },
    critical: {
      icon: XCircle,
      color: 'from-red-500 to-pink-600',
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-700 dark:text-red-300',
      label: 'Crítica',
    },
  };

  const config = severityConfig[diagnostic.severity];
  const SeverityIcon = config.icon;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 ${config.border}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <SeverityIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {diagnostic.problem}
            </h3>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                Gravidade: {config.label}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                {diagnostic.confidence}% de confiança
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          📋 Descrição do Problema
        </h4>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {diagnostic.description}
        </p>
      </div>

      {/* Solution */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          🔧 Solução Recomendada
        </h4>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {diagnostic.solution}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Custo Estimado
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {diagnostic.estimatedCost}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Analisado por
          </div>
          <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {diagnostic.aiModel}
          </div>
        </div>
      </div>
    </div>
  );
}
