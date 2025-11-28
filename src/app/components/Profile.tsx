"use client";

import {
  TrashIcon,
  MapPinIcon,
  LanguageIcon,
  PencilIcon,
  CheckIcon,
  PhotoIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

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
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-[#1a1a1d]/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <PhotoIcon className="w-5 h-5 text-pink-500" />
            Minhas Fotos
          </h2>
          {user.fotos.length > 0 && (
            <span className="text-sm text-gray-400 bg-[#2a2a2d] px-3 py-1 rounded-full">
              {user.fotos.length} {user.fotos.length === 1 ? "foto" : "fotos"}
            </span>
          )}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {user.fotos.length ? (
            user.fotos.map((f, i) => (
              <div key={i} className="relative flex-shrink-0 group">
                <img
                  src={f}
                  className="w-48 h-60 rounded-xl border-2 border-white/10 object-cover shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-pink-500/50"
                />

                {/* BOTÃO DE REMOVER - COM z-50 PARA FICAR ACIMA DE TUDO */}
                {editando && (
                  <button
                    onClick={() => {
                      console.log("🎯 Removendo foto índice:", i);
                      removerFoto(i);
                    }}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg z-50 border border-red-400"
                  >
                    <TrashIcon className="w-4 h-4 text-white" />
                  </button>
                )}

                {/* OVERLAY COM pointer-events-none PARA NÃO BLOQUEAR CLIQUES */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-all duration-300 pointer-events-none" />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-12">
              <UserCircleIcon className="w-16 h-16 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-lg">Nenhuma foto adicionada</p>
              <p className="text-gray-500 text-sm mt-1">
                Adicione fotos para mostrar quem você é
              </p>
            </div>
          )}
        </div>

        {editando && (
          <div className="flex justify-center mt-4">
            <label className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg font-medium flex items-center gap-2">
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <PhotoIcon className="w-5 h-5" />
                  Adicionar Fotos
                </>
              )}
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
      </div>

      <div className="bg-[#1a1a1d]/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            {editando ? (
              <div className="space-y-3">
                <input
                  className="bg-[#2a2a2d] border-2 border-pink-500/30 text-2xl font-bold w-full px-4 py-3 rounded-xl focus:outline-none focus:border-pink-500 transition-colors"
                  value={user.nome}
                  onChange={(e) => setUser({ ...user, nome: e.target.value })}
                  placeholder="Seu nome"
                />
                <input
                  type="number"
                  className="bg-[#2a2a2d] border-2 border-pink-500/30 text-xl text-gray-300 w-full px-4 py-2 rounded-xl focus:outline-none focus:border-pink-500 transition-colors"
                  value={user.idade}
                  onChange={(e) => setUser({ ...user, idade: e.target.value })}
                  placeholder="Sua idade"
                />
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  {user.nome}
                </h1>
                <p className="text-xl text-gray-300 mt-1">{user.idade} anos</p>
              </div>
            )}
          </div>

          <button
            onClick={() => (editando ? salvarEdicoes() : setEditando(true))}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              editando
                ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                : "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white shadow-lg"
            }`}
          >
            {editando ? (
              <>
                <CheckIcon className="w-5 h-5" />
                Salvar
              </>
            ) : (
              <>
                <PencilIcon className="w-5 h-5" />
                Editar
              </>
            )}
          </button>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-300 mb-3 block flex items-center gap-2">
            <UserCircleIcon className="w-4 h-4 text-pink-500" />
            Sobre mim
          </label>
          {editando ? (
            <textarea
              className="w-full bg-[#2a2a2d] border-2 border-pink-500/30 mt-1 p-4 rounded-xl focus:outline-none focus:border-pink-500 transition-colors resize-none min-h-32"
              value={user.sobre}
              onChange={(e) => setUser({ ...user, sobre: e.target.value })}
              placeholder="Conte um pouco sobre você..."
            />
          ) : (
            <div className="bg-[#2a2a2d] mt-1 p-4 rounded-xl border border-white/5">
              <p className="text-gray-300 leading-relaxed">
                {user.sobre || "Adicione uma descrição sobre você..."}
              </p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-4">
            Informações Básicas
          </h3>

          <div className="bg-[#2a2a2d] p-5 rounded-xl border border-white/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <span className="text-pink-500">📏</span>
              </div>
              <div className="flex-1">
                {editando ? (
                  <input
                    className="w-full bg-transparent border-b-2 border-pink-500/30 focus:outline-none focus:border-pink-500 py-1 transition-colors"
                    value={user.altura}
                    onChange={(e) =>
                      setUser({ ...user, altura: e.target.value })
                    }
                    placeholder="Sua altura"
                  />
                ) : (
                  <span className="text-white">
                    {user.altura || "Não informado"}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <MapPinIcon className="w-4 h-4 text-purple-500" />
              </div>
              <div className="flex-1">
                {editando ? (
                  <input
                    className="w-full bg-transparent border-b-2 border-purple-500/30 focus:outline-none focus:border-purple-500 py-1 transition-colors"
                    value={user.cidade}
                    onChange={(e) =>
                      setUser({ ...user, cidade: e.target.value })
                    }
                    placeholder="Sua cidade"
                  />
                ) : (
                  <span className="text-white">
                    {user.cidade || "Não informado"}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <LanguageIcon className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1">
                {editando ? (
                  <input
                    className="w-full bg-transparent border-b-2 border-blue-500/30 focus:outline-none focus:border-blue-500 py-1 transition-colors"
                    value={user.linguas?.join(", ")}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        linguas: e.target.value.split(",").map((s) => s.trim()),
                      })
                    }
                    placeholder="Português, Inglês, Espanhol..."
                  />
                ) : (
                  <span className="text-white">
                    {user.linguas?.join(", ") || "Não informado"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {editando && (
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <p className="text-yellow-400 text-sm text-center">
              💡 Lembre-se de salvar suas alterações!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
