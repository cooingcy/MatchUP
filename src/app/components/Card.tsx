"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export function UserCard({
  usr,
  fotoIndex,
  setFotoIndex,
  like,
  dislike,
  cardRef,
}: any) {
  return (
    <div
      ref={cardRef}
      className="
        w-[95%] max-w-sm bg-[#141416] rounded-3xl shadow-xl
        flex flex-col border border-white/10 select-none touch-none
        max-h-[85vh] overflow-auto
      "
    >
      <div className="relative w-full h-[45vh] min-h-[280px]">
        <img
          src={usr.fotos?.[fotoIndex]}
          className="w-full h-full object-cover"
        />

        {usr.fotos?.length > 1 && (
          <>
            <button
              onClick={() =>
                setFotoIndex((prev: number) =>
                  prev === 0 ? usr.fotos.length - 1 : prev - 1
                )
              }
              className="absolute top-1/2 left-3 -translate-y-1/2 text-white"
            >
              <ChevronLeftIcon className="w-8 h-8" />
            </button>

            <button
              onClick={() =>
                setFotoIndex((prev: number) =>
                  prev === usr.fotos.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute top-1/2 right-3 -translate-y-1/2 text-white"
            >
              <ChevronRightIcon className="w-8 h-8" />
            </button>
          </>
        )}
      </div>

      {/* INFO */}
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-2xl font-bold">
          {usr.nome}, {usr.idade}
        </h2>

        <p className="text-gray-300">Cidade - {usr.cidade}</p>
        <p className="text-gray-300">Idiomas: {usr.linguas}</p>

        <div>
          <h3 className="text-xl font-bold mb-1">Sobre mim:</h3>
          <p className="text-gray-300">{usr.sobre || "Sem descrição"}</p>
        </div>
      </div>

      <div className="w-full flex justify-center gap-10 py-4 sticky bottom-0 bg-[#141416]">
        <button
          onClick={dislike}
          className="bg-red-600 hover:bg-red-700 text-white w-14 h-14 rounded-full flex items-center justify-center"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>

        <button
          onClick={like}
          className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center"
        >
          <HeartIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
