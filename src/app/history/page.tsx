'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/custom/navbar';
import { Calendar, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import '@/lib/i18n';

interface DiagnosticHistory {
  id: string;
  date: Date;
  problem: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  solution: string;
  estimatedCost: string;
}

export default function HistoryPage() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [diagnostics, setDiagnostics] = useState<DiagnosticHistory[]>([]);

  useEffect(() => {
    setMounted(true);
    
    // Carregar histórico do localStorage
    const loadHistory = () => {
      try {
        const saved = localStorage.getItem('mecanai_history');
        if (saved) {
          const parsed = JSON.parse(saved);
          setDiagnostics(parsed.map((d: any) => ({ ...d, date: new Date(d.date) })));
        }
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };

    loadHistory();
  }, []);

  useEffect(() => {
    if (!loading && !user && mounted) {
      router.push('/');
    }
  }, [user, loading, router, mounted]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'from-green-400 to-emerald-500';
      case 'medium':
        return 'from-yellow-400 to-orange-500';
      case 'high':
        return 'from-orange-500 to-red-500';
      case 'critical':
        return 'from-red-500 to-pink-600';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="w-5 h-5" />;
      case 'medium':
        return <Clock className="w-5 h-5" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5" />;
      case 'critical':
        return <XCircle className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('history.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize todos os seus diagnósticos anteriores
              </p>
            </div>
          </div>

          {diagnostics.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('history.empty')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Comece a usar o diagnóstico para ver seu histórico aqui
              </p>
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Fazer Diagnóstico
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {diagnostics.map((diagnostic) => (
                <div
                  key={diagnostic.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${getSeverityColor(
                          diagnostic.severity
                        )} rounded-xl flex items-center justify-center text-white`}
                      >
                        {getSeverityIcon(diagnostic.severity)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {diagnostic.problem}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {diagnostic.date.toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getSeverityColor(
                        diagnostic.severity
                      )}`}
                    >
                      {diagnostic.severity.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Descrição
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {diagnostic.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Solução Recomendada
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {diagnostic.solution}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Custo Estimado
                        </p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {diagnostic.estimatedCost}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
