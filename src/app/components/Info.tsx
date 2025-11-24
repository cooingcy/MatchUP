"use client";

export function Info({ user, setUser, editando }: any) {
  return (
    <div className="w-[90%] max-w-md mt-10">
      <p className="text-gray-400 text-sm">Sobre mim</p>

      {editando ? (
        <textarea
          className="w-full bg-[#1b1b1d] p-3 mt-2 rounded-xl"
          value={user.sobre}
          onChange={(e) => setUser({ ...user, sobre: e.target.value })}
        />
      ) : (
        <div className="bg-[#1b1b1d] p-4 mt-2 rounded-xl">{user.sobre}</div>
      )}

      <p className="text-gray-400 mt-6 mb-2 text-sm">Informações básicas</p>

      <div className="bg-[#1b1b1d] p-4 rounded-xl space-y-3">
        {/* ALTURA */}
        <p className="text-gray-200 flex gap-2">
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

        {/* CIDADE */}
        <p className="text-gray-200 flex gap-2">
          📍
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

        {/* LÍNGUAS */}
        <p className="text-gray-200 flex gap-2">
          🗣️
          {editando ? (
            <input
              className="bg-transparent border-b border-gray-600"
              value={user.linguas.join(", ")}
              onChange={(e) =>
                setUser({
                  ...user,
                  linguas: e.target.value.split(",").map((v) => v.trim()),
                })
              }
            />
          ) : (
            <span>{user.linguas.join(", ")}</span>
          )}
        </p>
      </div>
    </div>
  );
}
