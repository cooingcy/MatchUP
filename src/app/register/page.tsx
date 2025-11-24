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
    <div className="bg-black/70 min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-900 shadow-xl rounded-xl p-8 w-full max-w-md">
        <button
          onClick={() => router.back()}
          className="text-pink-500 hover:text-pink-400 w-6 h-6 mb-4"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <h1 className="text-2xl font-bold text-center text-pink-500 mb-6">
          Criar Conta
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-1 text-white">Nome</label>
            <input
              type="text"
              value={nome}
              placeholder="Seu nome"
              onChange={(e) => setNome(e.target.value)}
              className="w-full bg-gray-900 text-white border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-white">Idade</label>
            <input
              type="number"
              value={idade}
              placeholder="Sua idade (18+)"
              onChange={(e) => setIdade(e.target.value)}
              min={18}
              className="w-full bg-gray-900 text-white border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-white">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Seu email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-900 text-white border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-white">Senha</label>
            <input
              type="password"
              value={senha}
              placeholder="Sua senha"
              onChange={(e) => setSenha(e.target.value)}
              className="w-full bg-gray-900 text-white border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-white">
              Confirme sua senha
            </label>
            <input
              type="password"
              value={confsenha}
              placeholder="Repita sua senha"
              onChange={(e) => setconfSenha(e.target.value)}
              className="w-full bg-gray-900 text-white border rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            {loading ? "Criando..." : "Criar Conta"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-300">
          Já tem uma conta?{" "}
          <a href="/login" className="text-pink-500 font-semibold">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
