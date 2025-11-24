"use client";

export function Fotos({
  user,
  editando,
  uploading,
  enviarImagens,
  removerFoto,
}: any) {
  return (
    <div className="w-full h-60 bg-[#111113] relative flex items-center justify-center overflow-x-auto gap-3 px-3 mt-24">
      {user.fotos.length > 0 ? (
        <div className="flex gap-3">
          {user.fotos.map((f: string, i: number) => (
            <div key={i} className="relative">
              <img
                src={f}
                className="w-40 h-52 rounded-xl object-cover border border-white/10 shadow"
              />

              {editando && (
                <button
                  onClick={() => removerFoto(i)}
                  className="absolute top-2 right-2 bg-black/60 p-2 rounded-full"
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">Nenhuma imagem selecionada</p>
      )}

      {editando && (
        <label className="absolute bottom-4 bg-pink-600 px-4 py-2 rounded-full cursor-pointer">
          {uploading ? "Enviando..." : "Selecionar imagens"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => enviarImagens(e.target.files)}
          />
        </label>
      )}
    </div>
  );
}
