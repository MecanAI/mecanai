'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/custom/navbar';
import { Send, HelpCircle, MessageCircle, Mail, Phone, Check } from 'lucide-react';
import '@/lib/i18n';

export default function SupportPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const faqs = [
    {
      question: 'Como funciona o diagnóstico por IA?',
      answer:
        'Nosso sistema utiliza 5 inteligências artificiais especializadas que analisam texto, imagens, vídeos e áudios para identificar problemas no seu veículo com precisão de 95%.',
    },
    {
      question: 'Quais tipos de arquivo posso enviar?',
      answer:
        'Você pode enviar fotos (JPG, PNG), vídeos (MP4, MOV) e áudios (MP3, WAV) do problema do seu veículo. Também pode descrever o problema por texto.',
    },
    {
      question: 'Qual a diferença entre os planos?',
      answer:
        'O plano Gratuito oferece 3 diagnósticos por mês apenas com texto. O plano PRO (R$ 27,90) oferece diagnósticos ilimitados com todas as funcionalidades. O plano OFICINA (R$ 62,90) é para até 5 usuários com recursos empresariais.',
    },
    {
      question: 'Como cancelo minha assinatura?',
      answer:
        'Você pode cancelar sua assinatura a qualquer momento nas configurações da sua conta. O acesso continuará até o fim do período pago.',
    },
    {
      question: 'O diagnóstico substitui um mecânico?',
      answer:
        'Não. Nosso diagnóstico é uma ferramenta de apoio que ajuda a identificar problemas, mas sempre recomendamos consultar um mecânico profissional para reparos.',
    },
    {
      question: 'Quais veículos são suportados?',
      answer:
        'Suportamos carros, motos, caminhões e outros veículos automotores de todas as marcas e modelos.',
    },
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('support.title')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('support.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('support.contact')}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Envie sua mensagem
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {t('support.name')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {t('support.email')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {t('support.message')}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sent}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {sent ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>{t('support.success')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('support.send')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Resposta em até 24h
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:suporte@mecanai.com.br"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-lg"
                >
                  suporte@mecanai.com.br
                </a>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Telefone</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Seg-Sex, 9h às 18h
                    </p>
                  </div>
                </div>
                <a
                  href="tel:+5511999999999"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-lg"
                >
                  +55 (11) 99999-9999
                </a>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-xl font-bold mb-2">Suporte Prioritário</h3>
                <p className="mb-4">
                  Assinantes PRO e OFICINA têm suporte 24/7 com resposta em até 2 horas.
                </p>
                <button className="px-6 py-2 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                  Assinar Agora
                </button>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('support.faq')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Respostas para as dúvidas mais comuns
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-gray-50 dark:bg-gray-700 rounded-xl p-6 cursor-pointer"
                >
                  <summary className="font-semibold text-gray-900 dark:text-white list-none flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-blue-600 dark:text-blue-400 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
