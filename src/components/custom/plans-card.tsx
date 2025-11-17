'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Plan } from '@/lib/types';

const plans: Plan[] = [
  {
    id: 'pro',
    name: 'PRO',
    price: 27.90,
    currency: 'BRL',
    period: '/mês',
    users: '1 usuário',
    features: [
      'Diagnósticos ilimitados',
      'Suporte prioritário',
      'Histórico completo',
      '5 IAs especializadas',
      'Análise de vídeo e áudio',
      'Relatórios detalhados',
    ],
  },
  {
    id: 'workshop',
    name: 'OFICINA',
    price: 62.90,
    currency: 'BRL',
    period: '/mês',
    users: 'Até 5 usuários',
    features: [
      'Tudo do plano PRO',
      'Gestão de equipe',
      'Relatórios avançados',
      'API de integração',
      'Suporte dedicado 24/7',
      'Dashboard administrativo',
      'Exportação de dados',
    ],
  },
];

interface PlansCardProps {
  onSelectPlan: (planId: 'pro' | 'workshop') => void;
}

export function PlansCard({ onSelectPlan }: PlansCardProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={`relative ${
            plan.id === 'workshop'
              ? 'border-2 border-orange-500 shadow-2xl scale-105'
              : ''
          }`}
        >
          {plan.id === 'workshop' && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              MAIS POPULAR
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <CardDescription>{plan.users}</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">
                R$ {plan.price.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className={`w-full ${
                plan.id === 'workshop'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
              }`}
              onClick={() => onSelectPlan(plan.id)}
            >
              {t('plans.subscribe')}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
