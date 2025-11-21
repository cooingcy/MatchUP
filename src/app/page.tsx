"use client";

import { useState } from "react";
import Link from "next/link";
import { loginWithGoogle } from "../services/loginGoogle";

export default function Home() {
  const [modal, setModal] = useState<"login" | "register" | null>(null);

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white relative">
      <nav className="w-full h-16 bg-[#111113] shadow flex items-center justify-between px-8 border-b border-white/10">
        <h1 className="text-2xl font-bold text-pink-500">LOGO</h1>

        <button
          onClick={() => setModal("login")}
          className="px-5 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition"
        >
          Entrar
        </button>
      </nav>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center px-4">
        <h2 className="text-3xl font-semibold text-white">
          Bem-vindo ao Projeto MatchUP
        </h2>

        <button
          onClick={() => setModal("register")}
          className="mt-6 px-8 py-3 bg-pink-600 text-white text-lg rounded-xl hover:bg-pink-700 transition"
        >
          Criar Conta
        </button>
      </div>

      {modal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-[#1a1a1d] w-80 p-6 rounded-xl shadow-xl text-center relative border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 text-gray-400 text-xl hover:text-gray-300"
              onClick={() => setModal(null)}
            >
              ✕
            </button>

            {modal === "login" && (
              <>
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Vamos começar
                </h3>

                <button
                  onClick={async () => {
                    const res = await loginWithGoogle();
                    if (res.ok) {
                      window.location.href = "/home";
                    } else {
                      alert("Erro ao autenticar!");
                    }
                  }}
                  className="w-full py-3 border border-white/20 rounded-lg mb-4 flex items-center justify-center gap-2 hover:bg-white/10 transition text-white"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-5 h-5"
                    alt="Google"
                  />
                  <span>Entrar com Google</span>
                </button>

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full mb-3 px-3 py-2 rounded-lg bg-[#2a2a2d] border border-white/10 text-white focus:outline-none focus:border-pink-500"
                />

                <input
                  type="password"
                  placeholder="Senha"
                  className="w-full mb-4 px-3 py-2 rounded-lg bg-[#2a2a2d] border border-white/10 text-white focus:outline-none focus:border-pink-500"
                />

                <button className="w-full py-3 bg-pink-600 rounded-lg font-medium hover:bg-pink-700 transition">
                  Entrar
                </button>

                <p className="text-sm mt-4 text-gray-300">
                  Não tem conta?{" "}
                  <span
                    onClick={() => setModal("register")}
                    className="text-pink-500 hover:text-pink-400 underline underline-offset-2 cursor-pointer"
                  >
                    Criar Conta
                  </span>
                </p>
              </>
            )}

            {modal === "register" && (
              <>
                <h3 className="text-lg font-semibold mb-4 text-white">
                  Criar Conta
                </h3>

                <button
                  onClick={async () => {
                    const res = await loginWithGoogle();
                    if (res.ok) {
                      window.location.href = "/home";
                    } else {
                      alert("Erro ao autenticar!");
                    }
                  }}
                  className="w-full py-3 border border-white/20 rounded-lg mb-3 flex items-center justify-center gap-2 hover:bg-white/10 transition text-white"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    className="w-5 h-5"
                    alt="Google"
                  />
                  <span>Continuar com Google</span>
                </button>

                <Link
                  href="/register"
                  className="text-pink-500 hover:text-pink-400 font-medium underline underline-offset-2 transition"
                >
                  Criar conta com email!
                </Link>

                <p className="text-sm mt-4 text-gray-300">
                  Já tem conta?{" "}
                  <span
                    onClick={() => setModal("login")}
                    className="text-pink-500 hover:text-pink-400 underline underline-offset-2 cursor-pointer"
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
