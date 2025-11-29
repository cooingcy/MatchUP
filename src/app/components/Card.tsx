"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
  XMarkIcon,
  MapPinIcon,
  LanguageIcon,
  UserCircleIcon,
  SparklesIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export function UserCard({
  usr,
  fotoIndex,
  setFotoIndex,
  like,
  dislike,
  cardRef,
}: any) {
  const [imageError, setImageError] = useState<boolean[]>([]);
  const [imageLoading, setImageLoading] = useState<boolean[]>([]);

  useEffect(() => {
    if (usr.fotos) {
      setImageLoading(usr.fotos.map(() => true));
      setImageError(usr.fotos.map(() => false));
    }
  }, [usr.fotos]);

  const handleImageLoad = (index: number) => {
    setImageLoading((prev) => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
  };

  const handleImageError = (index: number) => {
    setImageLoading((prev) => {
      const newLoading = [...prev];
      newLoading[index] = false;
      return newLoading;
    });
    setImageError((prev) => {
      const newError = [...prev];
      newError[index] = true;
      return newError;
    });
  };

  const getImageStyle = (foto: string, index: number) => {
    if (imageError[index]) {
      return "object-contain";
    }

    const img = new Image();
    img.src = foto;

    if (img.height > img.width * 1.5) {
      return "object-contain";
    }

    return "object-cover";
  };

  return (
    <div
      ref={cardRef}
      className="
        w-[95%] max-w-md bg-[#1a1a1d]/90 backdrop-blur-md rounded-3xl shadow-2xl
        flex flex-col border border-white/10 select-none touch-none
        relative
        transform transition-all duration-300 hover:shadow-3xl
        mb-8
        min-h-0 // Garante que o conteúdo possa encolher
      "
    >
      <div className="relative w-full h-[40vh] min-h-[280px] max-h-[400px] overflow-hidden bg-[#2a2a2d] flex-shrink-0">
        {usr.fotos?.[fotoIndex] && !imageError[fotoIndex] ? (
          <>
            {imageLoading[fotoIndex] && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            <img
              src={usr.fotos[fotoIndex]}
              className={`w-full h-full transition-opacity duration-300 ${
                imageLoading[fotoIndex] ? "opacity-0" : "opacity-100"
              } ${getImageStyle(usr.fotos[fotoIndex], fotoIndex)}`}
              onLoad={() => handleImageLoad(fotoIndex)}
              onError={() => handleImageError(fotoIndex)}
              alt={`Foto de ${usr.nome}`}
              style={{
                objectPosition:
                  getImageStyle(usr.fotos[fotoIndex], fotoIndex) ===
                  "object-contain"
                    ? "center"
                    : "center 30%",
              }}
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <FaceSmileIcon className="w-16 h-16 mb-4 text-gray-600" />
            <p className="text-lg">Foto não disponível</p>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a1d] to-transparent" />

        {usr.fotos?.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFotoIndex((prev: number) =>
                  prev === 0 ? usr.fotos.length - 1 : prev - 1
                );
              }}
              className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 group border border-white/20"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white group-hover:text-pink-400 transition-colors" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setFotoIndex((prev: number) =>
                  prev === usr.fotos.length - 1 ? 0 : prev + 1
                );
              }}
              className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 group border border-white/20"
            >
              <ChevronRightIcon className="w-6 h-6 text-white group-hover:text-pink-400 transition-colors" />
            </button>
          </>
        )}
      </div>

      {usr.fotos?.length > 1 && (
        <div className="flex justify-center mt-4 flex-shrink-0">
          <div className="flex gap-1 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
            {usr.fotos.map((_: any, index: number) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === fotoIndex ? "bg-pink-500 w-4" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="p-6 flex flex-col gap-4 flex-1 min-h-0 overflow-auto">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              {usr.nome}
            </h2>
            <p className="text-xl text-gray-300 mt-1">{usr.idade} anos</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <MapPinIcon className="w-5 h-5 text-purple-500" />
            <span className="text-sm">{usr.cidade}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-300">
            <LanguageIcon className="w-5 h-5 text-blue-500" />
            <span className="text-sm">{usr.linguas?.join(", ")}</span>
          </div>
        </div>

        {usr.altura && (
          <div className="flex items-center gap-2 text-gray-300">
            <SparklesIcon className="w-5 h-5 text-yellow-500" />
            <span className="text-sm">{usr.altura}</span>
          </div>
        )}

        <div className="mt-2">
          <div className="flex items-center gap-2 mb-3">
            <UserCircleIcon className="w-5 h-5 text-pink-500" />
            <h3 className="text-lg font-semibold text-white">Sobre mim</h3>
          </div>

          <div className="bg-[#2a2a2d]/50 backdrop-blur-sm rounded-xl p-4 border border-white/5">
            <p className="text-gray-300 leading-relaxed">
              {usr.sobre || "Esta pessoa ainda não adicionou uma descrição..."}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 pt-4 pb-6 border-t border-white/5 bg-[#1a1a1d]/80 backdrop-blur-md flex-shrink-0">
        <div className="flex justify-center gap-6 sm:gap-8">
          <button
            onClick={dislike}
            className="
              w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-red-600 
              hover:from-red-600 hover:to-red-700 
              text-white rounded-2xl flex items-center justify-center 
              transition-all duration-300 transform hover:scale-110 
              shadow-lg hover:shadow-red-500/25 border border-red-500/20
              active:scale-95 flex-shrink-0
            "
          >
            <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={like}
            className="
              w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 
              hover:from-green-600 hover:to-green-700 
              text-white rounded-2xl flex items-center justify-center 
              transition-all duration-300 transform hover:scale-110 
              shadow-lg hover:shadow-green-500/25 border border-green-500/20
              active:scale-95 flex-shrink-0
            "
          >
            <HeartIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
