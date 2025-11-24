"use client";

import { useEffect, useRef } from "react";
import { useSwipe } from "@/services/useSwipe";
import { useUsers } from "@/services/useUsers";
import { useAuth } from "@/services/useAuth";
import { UserCard } from "@/app/components/Card";
import { Navbar } from "@/app/components/Navbar";

export default function HomePage() {
  const cardRef = useRef(null);

  const { loading } = useAuth();
  const {
    usuarios,
    indexAtual,
    fotoIndex,
    setFotoIndex,
    loadUsers,
    likeUser,
    dislikeUser,
  } = useUsers();

  useEffect(() => {
    loadUsers();
  }, []);

  const usr = usuarios[indexAtual];

  useSwipe(cardRef, likeUser, dislikeUser, [indexAtual, usuarios]);

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white flex flex-col items-center">
      <Navbar />

      <div className="pt-24 w-full flex flex-col items-center px-6">

        {loading && (
          <p className="text-gray-300 text-lg mt-10">Carregando...</p>
        )}

        {!loading && !usr && (
          <p className="text-gray-300 text-center text-xl mt-20">
            Nenhum usuário disponível no momento.
          </p>
        )}

        {usr && (
          <UserCard
            usr={usr}
            fotoIndex={fotoIndex}
            setFotoIndex={setFotoIndex}
            like={likeUser}
            dislike={dislikeUser}
            cardRef={cardRef}
          />
        )}
      </div>
    </div>
  );
}