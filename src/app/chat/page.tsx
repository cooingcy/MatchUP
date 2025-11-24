"use client";

import { useSearchParams } from "next/navigation";
import { useChat } from "@/services/useChat";
import { useState, useRef, useEffect } from "react";
import MessageBubble from "@/app/components/MessageBubble";
import { auth } from "@/config/firebase";
import { Navbar } from "@/app/components/Navbar";

export default function ChatPage() {
  const params = useSearchParams();
  const matchId = params.get("id") ?? "";
  const { mensagens, enviarMensagem, loading } = useChat(matchId);

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
    return <div className="pt-20 p-4">Match inválido.</div>;
  }

  return (
    <div className="pt-20 h-screen bg-[#0b0b0d] text-white flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-auto px-4 py-6">
        {loading ? (
          <div className="text-gray-400">Carregando...</div>
        ) : mensagens.length === 0 ? (
          <div className="text-gray-400">Comece a conversa 👋</div>
        ) : (
          mensagens.map((m) => <MessageBubble key={m.id} message={m} />)
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-white/10 px-4 py-3 bg-[#111113]">
        <div className="max-w-3xl mx-auto flex gap-3 items-center">
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Mensagem..."
            className="flex-1 bg-[#0f0f10] px-4 py-2 rounded-full outline-none text-white"
          />
          <button
            onClick={handleSend}
            className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-full"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
