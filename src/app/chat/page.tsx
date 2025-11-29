"use client";

import { useSearchParams } from "next/navigation";
import { useChat } from "@/services/useChat";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "@/app/components/MessageBubble";
import { auth } from "@/config/firebase";
import { Navbar } from "@/app/components/Navbar";
import {
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default function ChatPage() {
  const params = useSearchParams();
  const matchId = params.get("id") ?? "";
  const { mensagens, enviarMensagem, loading, matchExiste } = useChat(matchId);

  const [texto, setTexto] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensagens]);

  function handleSend() {
    if (!texto.trim()) return;
    enviarMensagem(texto);
    setTexto("");
  }

  if (!matchId) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        </div>

        <Navbar />
        <div className="pt-20 p-4">
          <div className="max-w-md mx-auto mt-20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <UserCircleIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Match inválido
            </h2>
            <p className="text-gray-400">
              O link do chat parece estar incorreto.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!loading && !matchExiste) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        </div>

        <Navbar />
        <div className="pt-20 p-4">
          <div className="max-w-md mx-auto mt-20 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center shadow-2xl">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Match não encontrado
            </h2>
            <p className="text-gray-400 mb-6">
              Este chat não existe mais ou foi removido.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Voltar para Conversas
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white flex flex-col">
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        <Navbar />

        <div className="flex-1 overflow-auto px-4 py-6 pt-24">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300">Carregando conversa...</p>
              <p className="text-gray-500 text-sm mt-2">Preparando o chat</p>
            </div>
          ) : mensagens.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <SparklesIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Comece a conversa!
              </h3>
              <p className="text-gray-400 mb-1">
                Este é o início de uma nova conexão
              </p>
              <p className="text-gray-500 text-sm">
                Envie a primeira mensagem e quebre o gelo 👋
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {mensagens.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-white/10 bg-[#1a1a1d]/90 backdrop-blur-md px-4 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3 items-center">
              <input
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-[#2a2a2d] border-2 border-white/10 text-white px-6 py-3 rounded-2xl focus:outline-none focus:border-pink-500/50 transition-colors placeholder-gray-500"
                disabled={!matchExiste || loading}
              />

              <button
                onClick={handleSend}
                disabled={!matchExiste || loading || !texto.trim()}
                className="
                  bg-gradient-to-r from-pink-600 to-purple-600 
                  hover:from-pink-700 hover:to-purple-700 
                  disabled:from-gray-600 disabled:to-gray-700 
                  text-white p-3 rounded-2xl 
                  transition-all duration-300 transform 
                  hover:scale-105 disabled:transform-none 
                  disabled:cursor-not-allowed
                  shadow-lg flex items-center justify-center
                  min-w-[52px]
                "
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mt-2">
              <p className="text-xs text-gray-500">
                Pressione Enter para enviar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
