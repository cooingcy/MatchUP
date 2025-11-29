"use client";

import {
  PhotoIcon,
  TrashIcon,
  PlusIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/solid";

export function Fotos({
  user,
  editando,
  uploading,
  enviarImagens,
  removerFoto,
}: any) {
  // Função de debug para testar se o clique está funcionando
  const handleRemoverFoto = (index: number) => {
    console.log("🚀 CLICOU NO BOTÃO REMOVER - Índice:", index);
    console.log("📸 Fotos atuais:", user.fotos);
    removerFoto(index);
  };

  return (
    <div className="w-full bg-[#1a1a1d] rounded-2xl p-6 border border-white/10 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Minhas Fotos</h2>
        {user.fotos.length > 0 && (
          <span className="text-sm text-gray-400">
            {user.fotos.length} {user.fotos.length === 1 ? "foto" : "fotos"}
          </span>
        )}
      </div>

      <div>
        {user.fotos.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto">
            {user.fotos.map((f: string, i: number) => (
              <div key={i} className="flex flex-col items-center gap-2">
                {/* Imagem SIMPLES */}
                <div className="relative">
                  <img
                    src={f}
                    className="w-40 h-52 rounded-lg object-cover border border-gray-600"
                    alt={`Foto ${i + 1}`}
                  />

                  {/* Número da foto */}
                  <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                    {i + 1}
                  </div>
                </div>

                {/* Botão REMOVER - SUPER SIMPLES */}
                {editando && (
                  <button
                    onClick={() => handleRemoverFoto(i)}
                    className="
                      bg-red-500 text-white px-3 py-1 rounded text-sm
                      hover:bg-red-600 active:bg-red-700
                    "
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <PhotoIcon className="w-12 h-12 text-gray-500 mx-auto mb-2" />
            <p className="text-gray-400">Nenhuma foto adicionada</p>
          </div>
        )}

        {/* Botão ADICIONAR FOTOS */}
        {editando && (
          <div className="flex justify-center mt-4">
            <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600">
              {uploading ? "Enviando..." : "Adicionar Fotos"}
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  console.log("📁 Arquivos selecionados:", e.target.files);
                  enviarImagens(e.target.files);
                }}
                disabled={uploading}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
