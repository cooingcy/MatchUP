"use client";

import { useEffect, useRef } from "react";
import { useUsers } from "@/services/useUsers";
import { useAuth } from "@/services/useAuth";
import { UserCard } from "@/app/components/Card";
import { Navbar } from "@/app/components/Navbar";

export default function HomePage() {
  const cardRef = useRef(null);

  const { loading } = useAuth();
  const {
    usuarioAtual,
    fotoIndex,
    setFotoIndex,
    carregando,
    fimDosUsuarios,
    likeUser,
    dislikeUser,
    recarregarUsuarios,
  } = useUsers();

  const usr = usuarioAtual;


  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/10 to-blue-500/5"></div>

      <div className="relative z-10 w-full">
        <Navbar />

        <div className="pt-24 w-full flex flex-col items-center px-6 min-h-[calc(100vh-96px)]">
          <div className="text-center mb-8 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-3">
              Descubra Pessoas Incríveis
            </h1>
            {/* <p className="text-gray-400 text-lg">
              Deslize para direita para curtir, esquerda para passar
            </p> */}
          </div>

          {(loading || carregando) && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-300 text-lg">
                Procurando pessoas incríveis...
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Isso pode levar alguns segundos
              </p>
            </div>
          )}

          {fimDosUsuarios && (
            <div className="text-center py-20 max-w-md">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3">
                Ops... acabaram as pessoas!
              </h2>

              <p className="text-gray-300 text-lg mb-6">
                Você viu todos os perfis disponíveis no momento.
              </p>

              <p className="text-gray-500 mb-8">
                Novas pessoas se juntam todos os dias. Volte mais tarde para
                descobrir novas conexões!
              </p>

              <button
                onClick={recarregarUsuarios}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Buscar Novos Perfis
              </button>
            </div>
          )}

          {usr && (
            <div className="w-full max-w-md">
              <UserCard
                usr={usr}
                fotoIndex={fotoIndex}
                setFotoIndex={setFotoIndex}
                like={likeUser}
                dislike={dislikeUser}
                cardRef={cardRef}
              />
            </div>
          )}

          {/* {usr && (
            <div className="mt-8 max-w-md w-full">
              <div className="bg-[#1a1a1d]/80 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Deslize para esquerda</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">Deslize para direita</span>
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {/* {usr && !carregando && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-[#1a1a1d]/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">
                  Perfis disponíveis
                </span>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
