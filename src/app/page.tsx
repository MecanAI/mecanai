'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/custom/navbar';
import { HeroBanner } from '@/components/custom/hero-banner';
import { AuthModal } from '@/components/custom/auth-modal';
import { ChatInterface } from '@/components/custom/chat-interface';
import { WhyUse } from '@/components/custom/why-use';
import { VehicleShowcase } from '@/components/custom/vehicle-showcase';
import { HowToUse } from '@/components/custom/how-to-use';
import { HelpCircle } from 'lucide-react';
import '@/lib/i18n';

export default function Home() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [attemptedDiagnosis, setAttemptedDiagnosis] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDiagnosisAttempt = () => {
    if (!user) {
      setAttemptedDiagnosis(true);
      setShowAuthModal(true);
    }
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero Banner */}
        <div className="mb-12">
          <HeroBanner />
        </div>

        {/* Chat Interface */}
        <div className="max-w-6xl mx-auto mb-16 chat-interface-section">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-600 to-orange-500">
              <h2 className="text-2xl font-bold text-white mb-2">
                {t('hero.title')} <span className="text-yellow-300">{t('hero.titleHighlight')}</span>
              </h2>
              <p className="text-white/90">{t('hero.subtitle')}</p>
            </div>
            <div className="h-[600px]">
              <ChatInterface onAttemptDiagnosis={handleDiagnosisAttempt} />
            </div>
          </div>
        </div>

        {/* How To Use Section */}
        <div id="how-to-use" className="max-w-6xl mx-auto mb-16 scroll-mt-20">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-orange-100 dark:from-blue-900/30 dark:to-orange-900/30 px-6 py-3 rounded-full mb-6">
                  <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    Como Usar?
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">
                  Diagnóstico em
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                    5 Passos Simples
                  </span>
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Siga este guia rápido e descubra o problema do seu veículo em minutos
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    step: '1',
                    title: 'Especifique seu Veículo',
                    description: 'Informe marca, modelo, ano e especificações técnicas',
                    icon: '🚗',
                    color: 'from-blue-400 to-cyan-500',
                  },
                  {
                    step: '2',
                    title: 'Descreva o Problema',
                    description: 'Conte o que está acontecendo: barulhos, luzes, comportamento',
                    icon: '💬',
                    color: 'from-purple-400 to-pink-500',
                  },
                  {
                    step: '3',
                    title: 'Envie Mídia',
                    description: 'Tire fotos, grave vídeos ou áudios do problema (opcional)',
                    icon: '📸',
                    color: 'from-orange-400 to-red-500',
                  },
                  {
                    step: '4',
                    title: 'Aguarde a Análise',
                    description: '5 IAs especializadas analisarão em segundos',
                    icon: '🤖',
                    color: 'from-green-400 to-emerald-500',
                  },
                  {
                    step: '5',
                    title: 'Receba o Diagnóstico',
                    description: 'Veja problemas, soluções e estimativas de custo',
                    icon: '✅',
                    color: 'from-yellow-400 to-orange-500',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg mx-auto`}>
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-orange-500 text-white rounded-full font-bold text-sm mb-3">
                        {item.step}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => {
                    const chatSection = document.querySelector('.chat-interface-section');
                    if (chatSection) {
                      chatSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Começar Diagnóstico Agora
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Why Use Section */}
        <WhyUse />

        {/* Vehicle Showcase */}
        <VehicleShowcase />
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">{t('header.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('header.subtitle')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                    {t('footer.terms')}
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                    {t('footer.privacy')}
                  </a>
                </li>
                <li>
                  <a href="/support" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                    {t('header.support')}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                suporte@mecanai.com.br
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>{t('footer.rights')}</p>
            <p className="mt-2">{t('footer.powered')}</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            setAttemptedDiagnosis(false);
          }}
        />
      )}

      {/* How To Use Modal */}
      {showHowToUse && <HowToUse onClose={() => setShowHowToUse(false)} />}
    </div>
  );
}
