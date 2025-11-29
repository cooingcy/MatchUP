"use client";

export function Perfil({ user, setUser, editando, salvarEdicoes }: any) {
  return (
    <div className="mt-6 w-[90%] max-w-md bg-[#141416] rounded-2xl p-5 relative border border-white/10">
      {editando ? (
        <input
          className="bg-transparent border-b border-gray-600 text-xl font-bold"
          value={user.nome}
          onChange={(e) => setUser({ ...user, nome: e.target.value })}
        />
      ) : (
        <h1 className="text-2xl font-bold">{user.nome}</h1>
      )}

      {editando ? (
        <input
          className="bg-transparent border-b border-gray-600 text-xl mt-2"
          value={user.idade}
          onChange={(e) => setUser({ ...user, idade: e.target.value })}
        />
      ) : (
        <h1 className="text-2xl font-bold text-gray-300">{user.idade} anos</h1>
      )}

      <div className="w-full flex justify-center">
        <button
          className="absolute -bottom-6 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg"
          onClick={salvarEdicoes}
        >
          {editando ? "Salvar" : "Editar perfil"}
        </button>
      </div>
    </div>
  );
}
