'use client';

import { useState } from 'react';
import { X, Camera, Video, Mic, Upload } from 'lucide-react';

interface MediaCaptureProps {
  onCapture: (file: File, type: 'image' | 'video' | 'audio') => void;
  onClose: () => void;
  type: 'image' | 'video' | 'audio';
}

export function MediaCapture({ onCapture, onClose, type }: MediaCaptureProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startCapture = async () => {
    try {
      let stream: MediaStream;
      
      if (type === 'image' || type === 'video') {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: type === 'video',
        });
      } else {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      }

      setMediaStream(stream);

      if (type === 'video' || type === 'audio') {
        const recorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.push(e.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(chunks, {
            type: type === 'video' ? 'video/webm' : 'audio/webm',
          });
          const file = new File([blob], `${type}-${Date.now()}.webm`, {
            type: blob.type,
          });
          onCapture(file, type);
          stopCapture();
        };

        setMediaRecorder(recorder);
        recorder.start();
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Erro ao acessar câmera/microfone. Verifique as permissões.');
    }
  };

  const stopCapture = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    setMediaStream(null);
    setMediaRecorder(null);
    onClose();
  };

  const capturePhoto = () => {
    if (!mediaStream) return;

    const video = document.createElement('video');
    video.srcObject = mediaStream;
    video.play();

    video.onloadedmetadata = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `photo-${Date.now()}.jpg`, {
              type: 'image/jpeg',
            });
            onCapture(file, 'image');
            stopCapture();
          }
        }, 'image/jpeg');
      }
    };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onCapture(file, type);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full">
        <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-6 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {type === 'image' && 'Capturar Foto'}
              {type === 'video' && 'Gravar Vídeo'}
              {type === 'audio' && 'Gravar Áudio'}
            </h2>
            <p className="text-white/90 text-sm mt-1">
              {type === 'image' && 'Tire uma foto do problema'}
              {type === 'video' && 'Grave um vídeo mostrando o problema'}
              {type === 'audio' && 'Grave um áudio descrevendo o problema'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Preview Area */}
          {mediaStream && (type === 'image' || type === 'video') && (
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
              <video
                autoPlay
                muted
                playsInline
                ref={(video) => {
                  if (video && mediaStream) {
                    video.srcObject = mediaStream;
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Recording Indicator */}
          {isRecording && (
            <div className="flex items-center justify-center space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
              <span className="text-red-600 dark:text-red-400 font-semibold">
                Gravando...
              </span>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col space-y-4">
            {!mediaStream && !isRecording && (
              <>
                <button
                  onClick={startCapture}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-3"
                >
                  {type === 'image' && <Camera className="w-6 h-6" />}
                  {type === 'video' && <Video className="w-6 h-6" />}
                  {type === 'audio' && <Mic className="w-6 h-6" />}
                  <span>
                    {type === 'image' && 'Abrir Câmera'}
                    {type === 'video' && 'Iniciar Gravação'}
                    {type === 'audio' && 'Iniciar Gravação'}
                  </span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">
                      ou
                    </span>
                  </div>
                </div>

                <label className="w-full px-6 py-4 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all flex items-center justify-center space-x-3 cursor-pointer">
                  <Upload className="w-6 h-6" />
                  <span>Enviar Arquivo</span>
                  <input
                    type="file"
                    accept={
                      type === 'image'
                        ? 'image/*'
                        : type === 'video'
                        ? 'video/*'
                        : 'audio/*'
                    }
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </>
            )}

            {mediaStream && type === 'image' && !isRecording && (
              <button
                onClick={capturePhoto}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-3"
              >
                <Camera className="w-6 h-6" />
                <span>Tirar Foto</span>
              </button>
            )}

            {isRecording && (
              <button
                onClick={stopCapture}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center space-x-3"
              >
                <div className="w-4 h-4 bg-white rounded-sm" />
                <span>Parar Gravação</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
