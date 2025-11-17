'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, CreditCard, Smartphone, Tag, Check, Loader2 } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
}

interface CheckoutModalProps {
  plan: Plan;
  onClose: () => void;
}

export function CheckoutModal({ plan, onClose }: CheckoutModalProps) {
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'pix'>('credit');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // Extrair valor numérico do preço
  const basePrice = parseFloat(plan.price.replace('R$', '').replace(',', '.').trim());
  const discount = appliedCoupon ? (basePrice * appliedCoupon.discount) / 100 : 0;
  const finalPrice = basePrice - discount;

  const handleApplyCoupon = () => {
    // Cupons de exemplo
    const coupons: { [key: string]: number } = {
      MECANAI10: 10,
      MECANAI20: 20,
      PROMO30: 30,
      PRIMEIRA50: 50,
    };

    const upperCode = couponCode.toUpperCase();
    if (coupons[upperCode]) {
      setAppliedCoupon({
        code: upperCode,
        discount: coupons[upperCode],
      });
    } else {
      alert('Cupom inválido');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simular processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(t('checkout.success'));
    setProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{t('checkout.title')}</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Plan Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
              Resumo do Pedido
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('checkout.plan')}:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('checkout.price')}:</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {plan.price}
                  {plan.period}
                </span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>
                    {t('checkout.discount')} ({appliedCoupon.code}):
                  </span>
                  <span className="font-semibold">-R$ {discount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-600 flex justify-between">
                <span className="font-bold text-gray-900 dark:text-white">{t('checkout.total')}:</span>
                <span className="font-bold text-2xl text-blue-600 dark:text-blue-400">
                  R$ {finalPrice.toFixed(2)}
                  {plan.period}
                </span>
              </div>
            </div>
          </div>

          {/* Coupon */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {t('checkout.coupon')}
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Digite o código"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={!!appliedCoupon}
                />
              </div>
              {appliedCoupon ? (
                <button
                  type="button"
                  onClick={() => {
                    setAppliedCoupon(null);
                    setCouponCode('');
                  }}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Remover
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('checkout.applyCoupon')}
                </button>
              )}
            </div>
            {appliedCoupon && (
              <div className="mt-2 flex items-center space-x-2 text-green-600 dark:text-green-400">
                <Check className="w-5 h-5" />
                <span className="text-sm font-semibold">
                  Cupom aplicado! {appliedCoupon.discount}% de desconto
                </span>
              </div>
            )}
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Cupons disponíveis: MECANAI10, MECANAI20, PROMO30, PRIMEIRA50
            </p>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              {t('checkout.payment')}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('credit')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'credit'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-700 dark:text-gray-300" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t('checkout.creditCard')}
                </p>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  paymentMethod === 'pix'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <Smartphone className="w-8 h-8 mx-auto mb-2 text-gray-700 dark:text-gray-300" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {t('checkout.pix')}
                </p>
              </button>
            </div>
          </div>

          {/* Credit Card Form */}
          {paymentMethod === 'credit' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('checkout.cardNumber')}
                </label>
                <input
                  type="text"
                  value={cardData.number}
                  onChange={(e) =>
                    setCardData({ ...cardData, number: e.target.value.replace(/\D/g, '') })
                  }
                  placeholder="0000 0000 0000 0000"
                  maxLength={16}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {t('checkout.cardName')}
                </label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  placeholder="Nome como está no cartão"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {t('checkout.cardExpiry')}
                  </label>
                  <input
                    type="text"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                    placeholder="MM/AA"
                    maxLength={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {t('checkout.cardCvv')}
                  </label>
                  <input
                    type="text"
                    value={cardData.cvv}
                    onChange={(e) =>
                      setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })
                    }
                    placeholder="000"
                    maxLength={3}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PIX Instructions */}
          {paymentMethod === 'pix' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Instruções de Pagamento PIX
              </h4>
              <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>1. Clique em "Confirmar Pagamento"</li>
                <li>2. Um QR Code será gerado</li>
                <li>3. Abra o app do seu banco</li>
                <li>4. Escaneie o QR Code ou copie o código PIX</li>
                <li>5. Confirme o pagamento no seu banco</li>
              </ol>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={processing}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('checkout.processing')}</span>
              </>
            ) : (
              <span>{t('checkout.confirm')}</span>
            )}
          </button>

          {/* Security Notice */}
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            🔒 Pagamento 100% seguro e criptografado
          </p>
        </form>
      </div>
    </div>
  );
}
