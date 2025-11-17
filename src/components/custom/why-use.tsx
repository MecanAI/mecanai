'use client';

import { TrendingDown, Clock, Shield, Zap, CheckCircle, Users, Award, Sparkles } from 'lucide-react';

export function WhyUse() {
  const benefits = [
    {
      icon: Clock,
      title: 'Resultados em Segundos',
      description: 'Não perca tempo agendando visitas. Diagnóstico instantâneo 24/7.',
      stats: '3 dias → 30 segundos',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Shield,
      title: '95% de Precisão',
      description: '5 IAs especializadas trabalhando juntas para máxima confiabilidade.',
      stats: '95% de acerto',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Evite Problemas Maiores',
      description: 'Identifique problemas antes que se tornem graves e caros.',
      stats: 'Prevenção inteligente',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: TrendingDown,
      title: 'Economia Garantida',
      description: 'Saiba exatamente o problema antes de gastar em oficinas.',
      stats: 'Até 60% de economia',
      color: 'from-green-400 to-emerald-500',
    },
  ];

  const features = [
    'Diagnóstico multimídia (foto, vídeo, áudio)',
    'Análise de 5 IAs especializadas',
    'Estimativas de custo precisas',
    'Histórico completo de diagnósticos',
    'Suporte para todos os tipos de veículos',
    'Relatórios detalhados em PDF',
    'Disponível 24 horas por dia',
    'Sem necessidade de agendamento',
  ];

  return (
    <div id="why-use" className="py-16 px-4 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-orange-100 dark:from-blue-900/30 dark:to-orange-900/30 px-6 py-3 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              Por que escolher o MecanAI?
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Economia, Velocidade e
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Precisão Profissional
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Transforme a forma como você cuida do seu veículo com tecnologia de ponta
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {benefit.description}
              </p>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20 px-4 py-2 rounded-lg">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                  {benefit.stats}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Features List */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-xl mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Tudo que Você Precisa em Um Só Lugar
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Recursos profissionais ao alcance de um clique
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, value: '50.000+', label: 'Usuários Ativos' },
            { icon: Award, value: '95%', label: 'Taxa de Precisão' },
            { icon: Zap, value: '200.000+', label: 'Diagnósticos Realizados' },
            { icon: TrendingDown, value: '60%', label: 'Economia Média' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl p-6 text-center text-white"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <div className="text-3xl font-black mb-1">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
