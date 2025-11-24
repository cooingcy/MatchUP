"use client";

import { TrashIcon, MapPinIcon, LanguageIcon } from "@heroicons/react/24/solid";

export function Profile({
  user,
  setUser,
  editando,
  setEditando,
  uploading,
  enviarImagensCloudinary,
  removerFoto,
  salvarEdicoes,
}) {
  return (
    <>
      {/* =============================== FOTOS =============================== */}
      <div className="w-full min-h-60 bg-[#111113] flex items-center justify-center px-3 pt-24 pb-6 relative">
        <div className="flex gap-3 overflow-x-auto">
          {user.fotos.length ? (
            user.fotos.map((f, i) => (
              <div key={i} className="relative flex-shrink-0">
                <img
                  src={f}
                  className="w-40 h-52 rounded-xl border border-white/10 object-cover"
                />

                {editando && (
                  <button
                    onClick={() => removerFoto(i)}
                    className="absolute top-2 right-2 bg-black/60 p-2 rounded-full"
                  >
                    <TrashIcon className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">Nenhuma imagem</p>
          )}
        </div>
      </div>

      {/* =================== BOTÃO SELECIONAR IMAGENS ===================== */}
      {editando && (
        <div className="flex w-full justify-center mt-4 mb-4 z-20">
          <label className="bg-pink-600 hover:bg-pink-700 px-5 py-2 rounded-full cursor-pointer shadow-lg">
            {uploading ? "Enviando..." : "Selecionar imagens"}
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => enviarImagensCloudinary(e.target.files)}
            />
          </label>
        </div>
      )}

      {/* =========================== CAIXA DE DADOS ============================ */}
      <div className="w-[90%] max-w-md bg-[#141416] rounded-2xl p-5 shadow-xl border border-white/10 relative mt-4">
        {/* Nome */}
        {editando ? (
          <input
            className="bg-transparent border-b border-gray-600 text-xl font-bold w-full"
            value={user.nome}
            onChange={(e) => setUser({ ...user, nome: e.target.value })}
          />
        ) : (
          <h1 className="text-2xl font-bold">{user.nome}</h1>
        )}

        {/* Idade */}
        {editando ? (
          <input
            className="bg-transparent border-b border-gray-600 text-xl font-bold w-full mt-2"
            value={user.idade}
            onChange={(e) => setUser({ ...user, idade: e.target.value })}
          />
        ) : (
          <h1 className="text-xl text-gray-300">{user.idade} anos</h1>
        )}

        {/* Sobre */}
        <div className="mt-6">
          <p className="text-sm text-gray-400">Sobre mim</p>
          {editando ? (
            <textarea
              className="w-full bg-[#1b1b1d] mt-2 p-3 rounded-xl"
              value={user.sobre}
              onChange={(e) => setUser({ ...user, sobre: e.target.value })}
            />
          ) : (
            <div className="bg-[#1b1b1d] mt-2 p-4 rounded-xl">
              <p>{user.sobre}</p>
            </div>
          )}
        </div>

        {/* Informações Básicas */}
        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-2">Informações básicas</p>

          <div className="bg-[#1b1b1d] p-4 rounded-xl border border-white/5 space-y-3">
            {/* Altura */}
            <p className="flex items-center gap-2">
              📏
              {editando ? (
                <input
                  className="bg-transparent border-b border-gray-600"
                  value={user.altura}
                  onChange={(e) => setUser({ ...user, altura: e.target.value })}
                />
              ) : (
                <span>{user.altura}</span>
              )}
            </p>

            {/* Cidade */}
            <p className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5" />
              {editando ? (
                <input
                  className="bg-transparent border-b border-gray-600"
                  value={user.cidade}
                  onChange={(e) => setUser({ ...user, cidade: e.target.value })}
                />
              ) : (
                <span>{user.cidade}</span>
              )}
            </p>

            {/* Línguas */}
            <p className="flex items-center gap-2">
              <LanguageIcon className="w-5 h-5" />
              {editando ? (
                <input
                  className="bg-transparent border-b border-gray-600"
                  value={user.linguas.join(", ")}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      linguas: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                />
              ) : (
                <span>{user.linguas.join(", ")}</span>
              )}
            </p>
          </div>
        </div>

        {/* Botão Editar / Salvar — centralizado */}
        <div className="w-full flex justify-center">
          <button
            className="absolute -bottom-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
            onClick={() => (editando ? salvarEdicoes() : setEditando(true))}
          >
            {editando ? "Salvar" : "Editar perfil"}
          </button>
        </div>
      </div>
    </>
  );
}
