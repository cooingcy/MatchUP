"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarUsuario } from "../../services/authService";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function CadastroPage() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confsenha, setconfSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (Number(idade) < 18) {
      alert("Você precisa ter 18 anos ou mais para criar uma conta.");
      return;
    }

    if (senha !== confsenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      setLoading(true);

      await cadastrarUsuario({
        nome,
        idade: Number(idade),
        email,
        senha,
      });

      alert("Conta criada com sucesso!");

      router.push("/account");
    } catch (error: any) {
      alert("Erro: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/10 to-blue-500/5"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
            >
              <ChevronLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Voltar
            </button>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
              Criar Conta
            </h1>
            <p className="text-gray-400">
              Junte-se à comunidade e encontre conexões incríveis
            </p>
          </div>

          <div className="bg-[#1a1a1d]/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={nome}
                  placeholder="Como você gostaria de ser chamado?"
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-[#2a2a2d] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Idade
                </label>
                <input
                  type="number"
                  value={idade}
                  placeholder="18+"
                  onChange={(e) => setIdade(e.target.value)}
                  min={18}
                  className="w-full bg-[#2a2a2d] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  placeholder="seu@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#2a2a2d] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={senha}
                  placeholder="Crie uma senha segura"
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full bg-[#2a2a2d] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all placeholder-gray-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  value={confsenha}
                  placeholder="Digite a senha novamente"
                  onChange={(e) => setconfSenha(e.target.value)}
                  className="w-full bg-[#2a2a2d] border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all placeholder-gray-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Criando sua conta...
                  </div>
                ) : (
                  "Criar Minha Conta"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Já tem uma conta?{" "}
                <button
                  onClick={() => router.push("/")}
                  className="text-pink-500 hover:text-pink-400 font-semibold transition-colors underline underline-offset-2"
                >
                  Fazer login
                </button>
              </p>
            </div>

            <div className="mt-6 p-4 bg-[#2a2a2d]/50 rounded-xl border border-white/5">
              <p className="text-xs text-gray-400 text-center">
                Ao criar uma conta, você concorda com nossos{" "}
                <button className="text-pink-500 hover:text-pink-400 underline underline-offset-2">
                  Termos de Serviço
                </button>{" "}
                e{" "}
                <button className="text-pink-500 hover:text-pink-400 underline underline-offset-2">
                  Política de Privacidade
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
