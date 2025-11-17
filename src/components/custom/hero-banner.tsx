'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import '@/lib/i18n';

export function HeroBanner() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[600px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-3xl" />
    );
  }

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl">
      {/* Gradiente de fundo tecnológico */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
      
      {/* Padrão de grade tecnológica */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59,130,246,.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Efeitos de brilho animados */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 px-6 sm:px-12 py-16 sm:py-20">
        {/* Logo e Nome */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/10 shadow-2xl">
            <div className="flex items-center space-x-4">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/e671abfb-511f-454e-9476-a44834696b1f.png" 
                alt="MecanAI Logo" 
                className="h-14 w-auto drop-shadow-2xl"
              />
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  MecanAI
                </h1>
                <p className="text-cyan-300 text-sm font-semibold tracking-wide">
                  Diagnóstico Automotivo Inteligente
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Título Principal - Destaque */}
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Descubra o Problema do
            <br />
            Seu Veículo em{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              30 Segundos
            </span>
          </h2>
        </div>

        {/* Subtítulo - Entrelinhas */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <p className="text-xl sm:text-2xl text-gray-200 font-medium leading-relaxed mb-4">
            Nunca mais seja enganado por mecânicos!
          </p>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            Nossa IA identifica o problema <span className="text-cyan-400 font-bold">EXATO</span> do seu veículo com precisão cirúrgica.
            <br />
            <span className="text-cyan-300 font-semibold">Economize tempo e dinheiro.</span>
          </p>
        </div>

        {/* CTA - Resolver Problema Agora */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center space-y-4">
            <button 
              onClick={() => {
                const chatSection = document.querySelector('.chat-interface-section');
                if (chatSection) {
                  chatSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="group bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-105 flex items-center space-x-3"
            >
              <span>Resolver Meu Problema Agora</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
