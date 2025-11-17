'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/custom/navbar';
import { FileText, Shield } from 'lucide-react';
import '@/lib/i18n';

export default function TermsPage() {
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Termos de Uso
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Última atualização: Janeiro de 2024
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-6">
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                1. Aceitação dos Termos
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Ao acessar e usar o MecanAI, você concorda em cumprir e estar vinculado aos
                seguintes termos e condições de uso. Se você não concordar com qualquer parte
                destes termos, não deverá usar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                2. Descrição do Serviço
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                O MecanAI é uma plataforma de diagnóstico automotivo que utiliza inteligência
                artificial para identificar problemas em veículos. Os diagnósticos fornecidos são
                baseados em análise de IA e devem ser considerados como orientações, não
                substituindo a avaliação de um mecânico profissional.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                3. Responsabilidades do Usuário
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Fornecer informações precisas e verdadeiras sobre os problemas do veículo</li>
                <li>Usar o serviço de forma responsável e legal</li>
                <li>Não compartilhar suas credenciais de acesso com terceiros</li>
                <li>Manter a confidencialidade de sua senha</li>
                <li>Consultar um profissional qualificado antes de realizar reparos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                4. Limitações de Responsabilidade
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                O MecanAI não se responsabiliza por danos diretos ou indiretos resultantes do uso
                de nossos diagnósticos. Os resultados fornecidos são estimativas baseadas em IA e
                podem não refletir a realidade completa do problema. Sempre consulte um mecânico
                profissional antes de realizar qualquer reparo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                5. Propriedade Intelectual
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Todo o conteúdo, design, logotipos e tecnologia do MecanAI são propriedade
                exclusiva da empresa e estão protegidos por leis de direitos autorais e
                propriedade intelectual. É proibida a reprodução sem autorização prévia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                6. Planos e Pagamentos
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Os planos pagos são cobrados mensalmente. O cancelamento pode ser feito a qualquer
                momento, mas não haverá reembolso proporcional. O acesso aos recursos premium
                permanece ativo até o fim do período pago.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                7. Modificações dos Termos
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações
                entrarão em vigor imediatamente após a publicação. O uso continuado do serviço após
                as modificações constitui aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                8. Contato
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Para dúvidas sobre estes termos, entre em contato através do email:
                suporte@mecanai.com.br
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
