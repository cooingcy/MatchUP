"use client";

import {
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

export function SideMenu({
  email,
  telefone,
  setEmail,
  setTelefone,
  salvarConta,
  sairDaConta,
  fechar,
}: any) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={fechar}
      />

      <div className="fixed top-0 right-0 h-full w-80 bg-[#1a1a1d]/95 backdrop-blur-md p-6 border-l border-white/10 shadow-2xl z-50 animate-slide-in-right">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <UserCircleIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Configurações
              </h2>
              <p className="text-xs text-gray-400">Gerencie sua conta</p>
            </div>
          </div>

          <button
            onClick={fechar}
            className="w-8 h-8 flex items-center justify-center bg-[#2a2a2d] hover:bg-[#3a3a3d] rounded-lg transition-all duration-300 transform hover:scale-110 group"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <ShieldCheckIcon className="w-4 h-4 text-pink-500" />
            Informações de Contato
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-400 mb-2 flex items-center gap-2">
                <EnvelopeIcon className="w-4 h-4 text-purple-500" />
                E-mail
              </label>
              <input
                className="w-full bg-[#2a2a2d] border-2 border-white/5 text-white p-3 rounded-xl focus:outline-none focus:border-pink-500/50 transition-colors placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-gray-400 mb-2 flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-blue-500" />
                Telefone
              </label>
              <input
                className="w-full bg-[#2a2a2d] border-2 border-white/5 text-white p-3 rounded-xl focus:outline-none focus:border-pink-500/50 transition-colors placeholder-gray-500"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={salvarConta}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group"
          >
            <CheckIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Salvar Alterações
          </button>

          <button
            onClick={sairDaConta}
            className="w-full bg-red-600/90 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group border border-red-500/20"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Sair da Conta
          </button>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              MatchUP © {new Date().getFullYear()}
            </p>
            <p className="text-xs text-gray-600 mt-1">Versão 1.0.0</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
