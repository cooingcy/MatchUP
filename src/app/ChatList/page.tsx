"use client";

import { useChatList } from "@/services/useChatList";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import {
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default function ChatsListPage() {
  const { chats, loading } = useChatList();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/10 to-blue-500/5"></div>

      <div className="relative z-10">
        <Navbar />

        <div className="pt-24 px-6 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
              Suas Conversas
            </h1>
            <p className="text-gray-400">Conecte-se com seus matches</p>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300">Carregando suas conversas...</p>
              <p className="text-gray-500 text-sm mt-2">
                Buscando matches recentes
              </p>
            </div>
          )}

          {!loading && chats.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center shadow-2xl">
                <UserCircleIcon className="w-12 h-12 text-gray-400" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Nenhuma conversa ainda
              </h2>

              <p className="text-gray-300 text-lg mb-4">
                Você ainda não tem matches para conversar
              </p>

              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Dê like em pessoas interessantes e espere por um match para
                começar a conversar!
              </p>

              <button
                onClick={() => router.push("/home")}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Descobrir Pessoas
              </button>
            </div>
          )}

          {!loading && chats.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400">
                  {chats.length} {chats.length === 1 ? "conversa" : "conversas"}
                </p>
              </div>

              {chats.map((c) => (
                <div
                  key={c.matchId}
                  onClick={() => router.push(`/chat?id=${c.matchId}`)}
                  className="
                    group bg-[#1a1a1d]/80 backdrop-blur-md rounded-2xl p-4 
                    border border-white/10 hover:border-pink-500/30 
                    cursor-pointer transition-all duration-300 
                    transform hover:scale-[1.02] hover:shadow-2xl
                    relative overflow-hidden
                  "
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={c.usuario.fotos?.[0] || "/avatar-placeholder.png"}
                        className="w-20 h-20 rounded-2xl object-cover border-1 border-white/10 group-hover:border-pink-500/50 transition-colors shadow-lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h2 className="font-bold text-white truncate group-hover:text-pink-400 transition-colors">
                            {c.usuario.nome}
                          </h2>
                          <p className="text-sm text-gray-400 mt-1">
                            {c.usuario.idade} anos • {c.usuario.cidade}
                          </p>
                        </div>

                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {c.lastMessage
                              ? new Date(
                                  c.lastMessage.timestamp?.toDate?.() ||
                                    c.lastMessage.timestamp
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Novo"}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 truncate leading-relaxed">
                        {c.lastMessage?.text || (
                          <span className="text-pink-400/80 italic">
                            Clique para iniciar a conversa ✨
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && chats.length > 0 && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-[#1a1a1d]/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5">
                <SparklesIcon className="w-4 h-4 text-pink-500" />
                <span className="text-xs text-gray-400">
                  {chats.length} {chats.length === 1 ? "match" : "matches"}{" "}
                  encontrados
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
