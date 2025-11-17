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
import '@/lib/i18n';

export default function Home() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [attemptedDiagnosis, setAttemptedDiagnosis] = useState(false);
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
    </div>
  );
}
