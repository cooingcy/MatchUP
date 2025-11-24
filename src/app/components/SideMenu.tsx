"use client";

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
    <div className="fixed top-0 right-0 h-full w-72 bg-[#141416] p-5 border-l border-white/10 z-50">
      <h2 className="text-xl font-bold mb-6">Sua conta</h2>

      <label className="text-sm text-gray-400">E-mail</label>
      <input
        className="w-full bg-[#1b1b1d] p-2 rounded-lg mb-4 mt-1"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="text-sm text-gray-400">Telefone</label>
      <input
        className="w-full bg-[#1b1b1d] p-2 rounded-lg mb-6 mt-1"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

      <button
        className="bg-pink-600 w-full py-2 rounded-lg mb-3"
        onClick={salvarConta}
      >
        Salvar
      </button>

      <button
        className="bg-red-600 w-full py-2 rounded-lg mb-3"
        onClick={sairDaConta}
      >
        Sair da conta
      </button>

      <button className="text-gray-400 hover:text-gray-200" onClick={fechar}>
        Fechar
      </button>
    </div>
  );
}
