'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/custom/navbar';
import { Shield, Lock, Eye, Database } from 'lucide-react';
import '@/lib/i18n';

export default function PrivacyPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Política de Privacidade
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Última atualização: Janeiro de 2024
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <section>
              <div className="flex items-center space-x-2 mb-3">
                <Database className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  1. Informações que Coletamos
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Coletamos as seguintes informações quando você usa o MecanAI:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Informações de cadastro: nome, email e senha</li>
                <li>Informações de diagnóstico: fotos, vídeos, áudios e descrições de problemas</li>
                <li>Dados de uso: histórico de diagnósticos e interações com o sistema</li>
                <li>Informações de pagamento: processadas por terceiros seguros</li>
                <li>Dados técnicos: endereço IP, tipo de navegador e dispositivo</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center space-x-2 mb-3">
                <Eye className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  2. Como Usamos suas Informações
                </h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Fornecer e melhorar nossos serviços de diagnóstico</li>
                <li>Treinar e aprimorar nossos modelos de inteligência artificial</li>
                <li>Personalizar sua experiência no aplicativo</li>
                <li>Processar pagamentos e gerenciar assinaturas</li>
                <li>Enviar notificações importantes sobre o serviço</li>
                <li>Prevenir fraudes e garantir a segurança da plataforma</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center space-x-2 mb-3">
                <Lock className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  3. Proteção de Dados
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Levamos a segurança dos seus dados muito a sério:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Criptografia de ponta a ponta para dados sensíveis</li>
                <li>Servidores seguros com certificação SSL/TLS</li>
                <li>Acesso restrito aos dados apenas para equipe autorizada</li>
                <li>Backups regulares e redundância de dados</li>
                <li>Monitoramento contínuo contra ameaças de segurança</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                4. Compartilhamento de Informações
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Não vendemos suas informações pessoais. Podemos compartilhar dados apenas:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Com provedores de serviços terceirizados (pagamento, hospedagem)</li>
                <li>Quando exigido por lei ou ordem judicial</li>
                <li>Para proteger nossos direitos legais</li>
                <li>Com seu consentimento explícito</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                5. Seus Direitos
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                De acordo com a LGPD, você tem direito a:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar consentimento a qualquer momento</li>
                <li>Exportar seus dados em formato legível</li>
                <li>Opor-se ao processamento de dados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                6. Cookies e Tecnologias Similares
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência,
                analisar o uso do serviço e personalizar conteúdo. Você pode gerenciar suas
                preferências de cookies nas configurações do navegador.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                7. Retenção de Dados
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Mantemos seus dados pelo tempo necessário para fornecer nossos serviços e
                cumprir obrigações legais. Após a exclusão da conta, seus dados são removidos
                permanentemente em até 90 dias, exceto quando a retenção for exigida por lei.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                8. Alterações nesta Política
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Podemos atualizar esta política periodicamente. Notificaremos você sobre
                mudanças significativas por email ou através do aplicativo. O uso continuado
                após as alterações constitui aceitação da nova política.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                9. Contato
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Para questões sobre privacidade ou para exercer seus direitos, entre em contato:
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mt-2">
                privacidade@mecanai.com.br
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
