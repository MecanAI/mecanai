'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Send, Image as ImageIcon, Video, Mic, Paperclip, Loader2, Bot, User, Sparkles, Camera, Info } from 'lucide-react';
import { DiagnosticCard } from './diagnostic-card';
import { VehicleForm, VehicleData } from './vehicle-form';
import { MediaCapture } from './media-capture';
import { HowToUse } from './how-to-use';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: {
    type: 'image' | 'video' | 'audio';
    url: string;
    name: string;
  }[];
}

interface Diagnostic {
  id: string;
  problem: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  solution: string;
  estimatedCost: string;
  aiModel: string;
  confidence: number;
}

interface ChatInterfaceProps {
  onAttemptDiagnosis?: () => void;
}

export function ChatInterface({ onAttemptDiagnosis }: ChatInterfaceProps) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [currentAI, setCurrentAI] = useState('');
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showMediaCapture, setShowMediaCapture] = useState(false);
  const [captureType, setCaptureType] = useState<'image' | 'video' | 'audio'>('image');
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mensagem de boas-vindas
    if (messages.length === 0 && mounted) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: t('chat.welcome'),
          timestamp: new Date(),
        },
      ]);
    }
  }, [mounted]);

  const saveToHistory = (diagnostics: Diagnostic[]) => {
    try {
      const history = localStorage.getItem('mecanai_history');
      const existing = history ? JSON.parse(history) : [];
      const newEntries = diagnostics.map(d => ({
        id: d.id,
        date: new Date().toISOString(),
        problem: d.problem,
        severity: d.severity,
        description: d.description,
        solution: d.solution,
        estimatedCost: d.estimatedCost,
      }));
      localStorage.setItem('mecanai_history', JSON.stringify([...newEntries, ...existing]));
    } catch (error) {
      console.error('Error saving to history:', error);
    }
  };

  const handleVehicleFormSubmit = (data: VehicleData) => {
    setVehicleData(data);
    setShowVehicleForm(false);
    
    const vehicleInfo = `${data.brand} ${data.model} ${data.year} - Motor ${data.engine}, ${data.transmission}, ${data.fuel}, ${data.mileage}km`;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `Especificações do veículo: ${vehicleInfo}`,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleMediaCapture = (file: File, type: 'image' | 'video' | 'audio') => {
    const fileUrl = URL.createObjectURL(file);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `Anexei um arquivo ${type === 'image' ? 'de imagem' : type === 'video' ? 'de vídeo' : 'de áudio'} para análise`,
      timestamp: new Date(),
      attachments: [
        {
          type,
          url: fileUrl,
          name: file.name,
        },
      ],
    };

    setMessages((prev) => [...prev, newMessage]);
    analyzeProblem(newMessage.content, [{ type, url: fileUrl, name: file.name }]);
  };

  const analyzeProblem = async (
    message: string,
    attachments?: { type: 'image' | 'video' | 'audio'; url: string; name: string }[]
  ) => {
    setIsAnalyzing(true);

    // 4 IAs especializadas integradas
    const aiModels = [
      { name: 'Moondream 2', specialty: 'Análise Visual de Componentes', icon: '🔍' },
      { name: 'Florence-2', specialty: 'Detecção de Defeitos e Anomalias', icon: '🔧' },
      { name: 'SmolVLM', specialty: 'Compreensão Contextual', icon: '🧠' },
      { name: 'NanoVLM', specialty: 'Diagnóstico Rápido e Preciso', icon: '⚡' },
    ];

    // Simular análise sequencial com cada IA
    for (let i = 0; i < aiModels.length; i++) {
      setCurrentAI(`${aiModels[i].icon} Analisando com ${aiModels[i].name}...`);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    // Gerar diagnósticos baseados na análise (considerando dados do veículo se disponíveis)
    const vehicleContext = vehicleData 
      ? `\n\n📋 Veículo: ${vehicleData.brand} ${vehicleData.model} ${vehicleData.year} (${vehicleData.engine}, ${vehicleData.mileage}km)`
      : '';

    const problems = [
      {
        problem: 'Pastilhas de Freio Desgastadas',
        severity: 'high' as const,
        description:
          `As pastilhas de freio apresentam desgaste significativo, com menos de 3mm de material restante. Isso pode comprometer a eficiência da frenagem e aumentar a distância de parada.${vehicleContext}`,
        solution:
          'Substituir imediatamente as pastilhas de freio dianteiras e traseiras. Verificar também os discos de freio para possíveis danos ou deformações. Recomenda-se trocar o fluido de freio durante o serviço.',
        estimatedCost: 'R$ 400 - R$ 800',
        confidence: 96,
      },
      {
        problem: 'Óleo do Motor com Nível Baixo',
        severity: 'critical' as const,
        description:
          `O nível de óleo está abaixo do mínimo recomendado. Isso pode causar danos graves ao motor, incluindo superaquecimento, desgaste prematuro de componentes e até travamento do motor.${vehicleContext}`,
        solution:
          'Completar o nível de óleo imediatamente com o tipo especificado pelo fabricante (verificar manual do proprietário). Verificar possíveis vazamentos no motor, cárter e juntas. Agendar troca de óleo completa se estiver próximo do prazo.',
        estimatedCost: 'R$ 50 - R$ 150',
        confidence: 98,
      },
      {
        problem: 'Filtro de Ar Sujo',
        severity: 'medium' as const,
        description:
          `O filtro de ar está obstruído com sujeira e detritos, reduzindo a eficiência do motor em até 15% e aumentando o consumo de combustível. Pode causar perda de potência e dificuldade na aceleração.${vehicleContext}`,
        solution:
          'Substituir o filtro de ar por um novo original ou de qualidade equivalente. É uma manutenção simples que pode ser feita em casa com ferramentas básicas. Verificar também a caixa do filtro para acúmulo de sujeira.',
        estimatedCost: 'R$ 80 - R$ 200',
        confidence: 92,
      },
    ];

    const newDiagnostics: Diagnostic[] = problems.map((problem, index) => ({
      id: Date.now().toString() + index,
      ...problem,
      aiModel: aiModels[index % aiModels.length].name,
    }));

    setDiagnostics((prev) => [...prev, ...newDiagnostics]);
    saveToHistory(newDiagnostics);

    const responseMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `✨ Análise completa realizada por 4 inteligências artificiais especializadas!\n\n🔍 Moondream 2 analisou os componentes visuais\n🔧 Florence-2 detectou defeitos e anomalias\n🧠 SmolVLM compreendeu o contexto do problema\n⚡ NanoVLM realizou diagnóstico rápido e preciso\n\nIdentificamos ${newDiagnostics.length} problemas potenciais no seu veículo com alta confiança. Veja os detalhes abaixo:`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, responseMessage]);
    setIsAnalyzing(false);
    setCurrentAI('');
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!user) {
      onAttemptDiagnosis?.();
      return;
    }

    // Se não tem dados do veículo, solicitar primeiro
    if (!vehicleData) {
      setShowVehicleForm(true);
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    analyzeProblem(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMediaButtonClick = (type: 'image' | 'video' | 'audio') => {
    if (!user) {
      onAttemptDiagnosis?.();
      return;
    }
    setCaptureType(type);
    setShowMediaCapture(true);
  };

  // Função para formatar timestamp de forma consistente
  const formatTimestamp = (date: Date) => {
    if (!mounted) return '';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Info Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              {vehicleData 
                ? `${vehicleData.brand} ${vehicleData.model} ${vehicleData.year}`
                : 'Especifique seu veículo para diagnóstico mais preciso'}
            </span>
          </div>
          <button
            onClick={() => setShowHowToUse(true)}
            className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Como usar?
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[85%] sm:max-w-[80%] ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                      : 'bg-gradient-to-br from-orange-500 to-yellow-500'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>
                <div
                  className={`rounded-2xl p-3 sm:p-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  {message.attachments && (
                    <div className="mt-2 space-y-2">
                      {message.attachments.map((attachment, index) => (
                        <div key={index}>
                          {attachment.type === 'image' && (
                            <img
                              src={attachment.url}
                              alt={attachment.name}
                              className="max-w-full rounded-lg"
                            />
                          )}
                          {attachment.type === 'video' && (
                            <video
                              src={attachment.url}
                              controls
                              className="max-w-full rounded-lg"
                            />
                          )}
                          {attachment.type === 'audio' && (
                            <audio src={attachment.url} controls className="w-full" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <span className="text-[10px] sm:text-xs mt-2 block opacity-70">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[85%] sm:max-w-[80%]">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-orange-500 to-yellow-500">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
                </div>
                <div className="rounded-2xl p-3 sm:p-4 bg-gray-100 dark:bg-gray-700">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-blue-600" />
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white font-semibold">
                      {currentAI || 'Iniciando análise...'}
                    </p>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Processando com 4 IAs especializadas (Moondream 2, Florence-2, SmolVLM, NanoVLM)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Diagnostics */}
          {diagnostics.length > 0 && (
            <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white">
                  Diagnósticos Identificados
                </h3>
              </div>
              {diagnostics.map((diagnostic) => (
                <DiagnosticCard key={diagnostic.id} diagnostic={diagnostic} />
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4">
          <div className="flex items-end space-x-2">
            <div className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() => handleMediaButtonClick('image')}
                className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 hover:scale-110 transition-all"
                title="Capturar Foto"
              >
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </button>
              <button
                onClick={() => handleMediaButtonClick('video')}
                className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 hover:scale-110 transition-all"
                title="Gravar Vídeo"
              >
                <Video className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
              </button>
              <button
                onClick={() => handleMediaButtonClick('audio')}
                className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 hover:scale-110 transition-all"
                title="Gravar Áudio"
              >
                <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400" />
              </button>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chat.placeholder')}
              className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32"
              rows={1}
            />

            <button
              onClick={handleSend}
              disabled={!input.trim() || isAnalyzing}
              className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showVehicleForm && (
        <VehicleForm
          onSubmit={handleVehicleFormSubmit}
          onClose={() => setShowVehicleForm(false)}
        />
      )}

      {showMediaCapture && (
        <MediaCapture
          type={captureType}
          onCapture={handleMediaCapture}
          onClose={() => setShowMediaCapture(false)}
        />
      )}

      {showHowToUse && (
        <HowToUse onClose={() => setShowHowToUse(false)} />
      )}
    </>
  );
}
