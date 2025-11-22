"use client";

import { useEffect, useState, useRef } from "react";
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/solid";

export default function HomePage() {
  const router = useRouter();
  const params = useSearchParams();
  const userData = params.get("user") ? JSON.parse(params.get("user")) : null;

  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [indexAtual, setIndexAtual] = useState(0);
  const [fotoIndex, setFotoIndex] = useState(0);

  const cardRef = useRef<HTMLDivElement | null>(null);

  // VERIFICA LOGIN
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usr) => {
      if (!usr) router.replace("/");
      loadUsers();
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // CARREGAR USUÁRIOS
  async function loadUsers() {
    try {
      const ref = collection(db, "users");
      const snap = await getDocs(ref);

      const lista: any[] = [];
      snap.forEach((doc) => lista.push({ id: doc.id, ...doc.data() }));

      // remove o próprio usuário
      const filtrado = lista.filter((u) => u.id !== auth.currentUser?.uid);

      setUsuarios(filtrado);
    } catch (e) {
      console.log("Erro ao carregar usuários:", e);
    }
  }

  // NAVEGAÇÃO ENTRE USUÁRIOS
  function proximoUsuario() {
    setFotoIndex(0);
    setIndexAtual((prev) => Math.min(prev + 1, usuarios.length - 1));
  }

  function like() {
    console.log("LIKE:", usuarios[indexAtual].nome);
    proximoUsuario();
  }

  function dislike() {
    console.log("DISLIKE:", usuarios[indexAtual].nome);
    proximoUsuario();
  }

  // GESTO DE ARRASTAR
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let startX = 0;

    function start(e: any) {
      startX = e.touches[0].clientX;
    }

    function move(e: any) {
      if (!startX) return;
      const currentX = e.touches[0].clientX;
      const diff = currentX - startX;

      card.style.transform = `translateX(${diff}px) rotate(${diff / 20}deg)`;
    }

    function end(e: any) {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;

      if (diff > 120) like();
      else if (diff < -120) dislike();

      card.style.transform = "";
      startX = 0;
    }

    card.addEventListener("touchstart", start);
    card.addEventListener("touchmove", move);
    card.addEventListener("touchend", end);

    return () => {
      card.removeEventListener("touchstart", start);
      card.removeEventListener("touchmove", move);
      card.removeEventListener("touchend", end);
    };
  }, [indexAtual, usuarios]);

  if (loading) return <div className="text-white p-6">Carregando...</div>;

  if (usuarios.length === 0)
    return (
      <p className="text-white text-center mt-20">
        Nenhum usuário disponível no momento.
      </p>
    );

  const usr = usuarios[indexAtual];

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white flex flex-col items-center">
      <nav className="w-full h-16 bg-[#111113] border-b border-white/10 shadow flex items-center justify-between px-6 fixed top-0 left-0 z-20">
        <h1
          className="text-2xl font-bold text-pink-500 cursor-pointer"
          onClick={() => router.push("/home")}
        >
          MatchUP
        </h1>

        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push("/account")}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <UserIcon className="w-7 h-7 text-pink-500" />
            <span className="text-pink-500 text-lg">Conta</span>
          </button>
        </div>
      </nav>

      {/* CONTEÚDO (com padding por causa da navbar fixa) */}
      <div className="pt-20 w-full flex flex-col items-center">
        {/* CARD */}
        <div
          ref={cardRef}
          className="
            w-[90%] max-w-sm h-[75vh] bg-[#141416] rounded-3xl shadow-xl relative overflow-hidden
            flex flex-col border border-white/10 select-none touch-none
          "
        >
          {/* FOTO */}
          <div className="relative h-3/5">
            <img
              src={usr.fotos?.[fotoIndex] || "/user-placeholder.png"}
              className="w-full h-full object-cover"
            />

            {usr.fotos?.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setFotoIndex((prev) =>
                      prev === 0 ? usr.fotos.length - 1 : prev - 1
                    )
                  }
                  className="absolute top-1/2 left-3 text-3xl"
                >
                  ◀
                </button>

                <button
                  onClick={() =>
                    setFotoIndex((prev) =>
                      prev === usr.fotos.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute top-1/2 right-3 text-3xl"
                >
                  ▶
                </button>
              </>
            )}
          </div>

          {/* INFO */}
          <div className="p-5 flex flex-col gap-3 h-2/5">
            <h2 className="text-2xl font-bold">
              {usr.nome}, {usr.idade}
            </h2>

            <p className="text-gray-300 leading-6">
              {usr.sobre || "Sem descrição"}
            </p>
          </div>

          {/* BOTÕES LIKE / DISLIKE */}
          <div className="absolute bottom-4 w-full flex justify-center gap-10">
            <button
              onClick={dislike}
              className="bg-red-600 hover:bg-red-700 text-white w-14 h-14 rounded-full text-3xl flex items-center justify-center"
            >
              ✕
            </button>

            <button
              onClick={like}
              className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full text-3xl flex items-center justify-center"
            >
              ❤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
