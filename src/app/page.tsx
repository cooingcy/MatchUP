"use client";

import { useState } from "react";
import Link from "next/link";
import { loginWithGoogle } from "../services/loginGoogle";
import { loginWithEmail } from "../services/loginEmail";

export default function SplashScreen() {
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white relative overflow-hidden">
      {/* Animação de ondas no fundo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      {/* Gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-blue-500/10 animate-gradient-x"></div>

      <nav className="w-full h-16 bg-[#111113]/80 backdrop-blur-md shadow flex items-center justify-between px-8 border-b border-white/10 relative z-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          MatchUP
        </h1>

        <button
          onClick={() => setModal("login")}
          className="px-5 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Entrar
        </button>
      </nav>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center px-4 relative z-10">
        {/* Ícone decorativo */}
        <div className="w-20 h-20 mb-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Encontre sua <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">conexão</span> perfeita
        </h2>
        
        <p className="text-lg text-gray-300 mb-8 max-w-md">
          Conheça pessoas incríveis e crie conexões genuínas. 
          Sua próxima grande história começa aqui.
        </p>

        <div className="flex gap-4 flex-col sm:flex-row">
          <button
            onClick={() => setModal("register")}
            className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-lg rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
          >
            Começar Agora
          </button>
          
          <button
            onClick={() => setModal("login")}
            className="px-8 py-3 border-2 border-pink-500 text-pink-400 text-lg rounded-xl hover:bg-pink-500 hover:text-white transition-all duration-300 font-semibold"
          >
            Já Tenho Conta
          </button>
        </div>

      </div>

      {modal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-[#1a1a1d]/90 backdrop-blur-md w-80 p-6 rounded-2xl shadow-2xl text-center relative border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-gray-400 text-xl hover:text-white transition-colors"
              onClick={() => setModal(null)}
            >
              ✕
            </button>

            {modal === "login" && (
              <>
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                <h3 className="text-xl font-semibold mb-6 text-white">
                  Bem-vindo de volta!
                </h3>

                <button
                  onClick={async () => {
                    const res = await loginWithGoogle();
                    if (res.ok) {
                      const dados = encodeURIComponent(
                        JSON.stringify(res.user)
                      );
                      window.location.href = `/home?user=${dados}`;
                    } else {
                      alert("Erro ao autenticar!");
                    }
                  }}
                  className="w-full py-3 border border-white/20 rounded-xl mb-4 flex items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300 text-white font-medium"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-5 h-5"
                    alt="Google"
                  />
                  <span>Entrar com Google</span>
                </button>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1a1a1d] text-gray-400">ou</span>
                  </div>
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                  className="w-full mb-4 px-4 py-3 rounded-xl bg-[#2a2a2d] border border-white/10 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                />

                <input
                  type="password"
                  placeholder="Senha"
                  value={senhaLogin}
                  onChange={(e) => setSenhaLogin(e.target.value)}
                  className="w-full mb-6 px-4 py-3 rounded-xl bg-[#2a2a2d] border border-white/10 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                />

                <button
                  className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 mb-4"
                  onClick={async () => {
                    const res = await loginWithEmail(emailLogin, senhaLogin);

                    if (!res.ok) {
                      alert("Email ou senha incorretos!");
                      return;
                    }

                    const dados = encodeURIComponent(JSON.stringify(res.user));
                    window.location.href = `/home?user=${dados}`;
                  }}
                >
                  Entrar
                </button>

                <p className="text-sm text-gray-300">
                  Não tem conta?{" "}
                  <span
                    onClick={() => setModal("register")}
                    className="text-pink-500 hover:text-pink-400 underline underline-offset-2 cursor-pointer font-medium transition-colors"
                  >
                    Criar Conta
                  </span>
                </p>
              </>
            )}

            {modal === "register" && (
              <>
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>

                <h3 className="text-xl font-semibold mb-6 text-white">
                  Junte-se a nós!
                </h3>

                <button
                  onClick={async () => {
                    const res = await loginWithGoogle();
                    if (res.ok) {
                      window.location.href = "/account";
                    } else {
                      alert("Erro ao autenticar!");
                    }
                  }}
                  className="w-full py-3 border border-white/20 rounded-xl mb-4 flex items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300 text-white font-medium"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-5 h-5"
                    alt="Google"
                  />
                  <span>Continuar com Google</span>
                </button>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#1a1a1d] text-gray-400">ou</span>
                  </div>
                </div>

                <Link
                  href="/register"
                  className="block w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Criar conta com email
                </Link>

                <p className="text-sm mt-4 text-gray-300">
                  Já tem conta?{" "}
                  <span
                    onClick={() => setModal("login")}
                    className="text-pink-500 hover:text-pink-400 underline underline-offset-2 cursor-pointer font-medium transition-colors"
                  >
                    Entrar
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}