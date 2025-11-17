'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/custom/navbar';
import { Sun, Moon, Monitor, Globe, Bell, Check } from 'lucide-react';
import '@/lib/i18n';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [language, setLanguage] = useState('pt');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Carregar configurações salvas
    const savedTheme = localStorage.getItem('mecanai_theme') as 'light' | 'dark' | 'system' || 'system';
    const savedLanguage = localStorage.getItem('mecanai_language') || 'pt';
    const savedEmailNotif = localStorage.getItem('mecanai_email_notif') !== 'false';
    const savedPushNotif = localStorage.getItem('mecanai_push_notif') !== 'false';
    
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    setEmailNotifications(savedEmailNotif);
    setPushNotifications(savedPushNotif);
    
    // Aplicar tema
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', newTheme === 'dark');
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('mecanai_theme', newTheme);
    applyTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('mecanai_language', newLanguage);
  };

  const handleSave = () => {
    localStorage.setItem('mecanai_email_notif', emailNotifications.toString());
    localStorage.setItem('mecanai_push_notif', pushNotifications.toString());
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const themes = [
    { id: 'light', name: t('settings.light'), icon: Sun },
    { id: 'dark', name: t('settings.dark'), icon: Moon },
    { id: 'system', name: t('settings.system'), icon: Monitor },
  ];

  const languages = [
    { id: 'pt', name: 'Português', flag: '🇧🇷' },
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
              {t('settings.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Personalize sua experiência no MecanAI
            </p>
          </div>

          {/* Theme Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('settings.theme')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Escolha o tema da interface
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.id}
                  onClick={() => handleThemeChange(themeOption.id as 'light' | 'dark' | 'system')}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    theme === themeOption.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                  }`}
                >
                  <themeOption.icon className={`w-8 h-8 mx-auto mb-3 ${
                    theme === themeOption.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-semibold ${
                    theme === themeOption.id
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {themeOption.name}
                  </span>
                  {theme === themeOption.id && (
                    <Check className="w-5 h-5 text-blue-600 mx-auto mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Language Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('settings.language')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Selecione seu idioma preferido
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang.id)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    language === lang.id
                      ? 'border-orange-600 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-orange-400'
                  }`}
                >
                  <div className="text-4xl mb-3">{lang.flag}</div>
                  <span className={`font-semibold ${
                    language === lang.id
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {lang.name}
                  </span>
                  {language === lang.id && (
                    <Check className="w-5 h-5 text-orange-600 mx-auto mt-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('settings.notifications')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Gerencie suas notificações
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {t('settings.emailNotifications')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Receba atualizações por email
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-6 h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {t('settings.pushNotifications')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Receba notificações no navegador
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  className="w-6 h-6 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-lg hover:scale-105 transition-all"
          >
            {saved ? (
              <span className="flex items-center justify-center space-x-2">
                <Check className="w-5 h-5" />
                <span>{t('settings.saved')}</span>
              </span>
            ) : (
              t('settings.save')
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
