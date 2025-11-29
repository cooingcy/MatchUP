"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/config/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export function useUsers() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [indexAtual, setIndexAtual] = useState(0);
  const [fotoIndex, setFotoIndex] = useState(0);
  const [carregando, setCarregando] = useState(true);

  async function loadUsers() {
    setCarregando(true);
    try {
      const snap = await getDocs(collection(db, "users"));
      const lista: any[] = [];

      snap.forEach((d) => lista.push({ id: d.id, ...d.data() }));

      const meuId = auth.currentUser?.uid;

      const [likesSnap, dislikesSnap] = await Promise.all([
        getDocs(collection(db, "users", meuId, "likes")),
        getDocs(collection(db, "users", meuId, "dislikes")),
      ]);

      const usuariosAvaliados = new Set([
        ...likesSnap.docs.map((d) => d.id),
        ...dislikesSnap.docs.map((d) => d.id),
      ]);

      const filtrado = lista.filter(
        (u) => u.id !== meuId && !usuariosAvaliados.has(u.id)
      );

      setUsuarios(filtrado);
      setIndexAtual(0);
      setFotoIndex(0);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function proximoUsuario() {
    setFotoIndex(0);
    if (indexAtual < usuarios.length - 1) {
      setIndexAtual((prev) => prev + 1);
    }
  }

  async function dislikeUser() {
    if (usuarios.length === 0) return;

    const meuId = auth.currentUser?.uid;
    const outroId = usuarios[indexAtual].id;

    try {
      await setDoc(doc(db, "users", meuId, "dislikes", outroId), {
        disliked: true,
        timestamp: Date.now(),
      });

      const novaLista = usuarios.filter((_, index) => index !== indexAtual);
      setUsuarios(novaLista);

      if (indexAtual >= novaLista.length && novaLista.length > 0) {
        setIndexAtual(novaLista.length - 1);
      } else if (novaLista.length === 0) {
        setIndexAtual(0);
      }
    } catch (error) {
      console.error("Erro ao dar dislike:", error);
    }
  }

  async function likeUser() {
    if (usuarios.length === 0) return;

    const meuId = auth.currentUser?.uid;
    const outroId = usuarios[indexAtual].id;

    try {
      await setDoc(doc(db, "users", meuId, "likes", outroId), {
        liked: true,
        timestamp: Date.now(),
      });

      const snap = await getDoc(doc(db, "users", outroId, "likes", meuId));

      if (snap.exists()) {
        const matchRef = doc(collection(db, "matches"));
        await setDoc(matchRef, {
          users: [meuId, outroId],
          timestamp: Date.now(),
          lastUpdated: Date.now(),
          userNames: {
            [meuId]: auth.currentUser?.displayName || "Usuário",
            [outroId]: usuarios[indexAtual].nome,
          },
        });

        const novaLista = usuarios.filter((_, index) => index !== indexAtual);
        setUsuarios(novaLista);

        router.push(`/chat?id=${matchRef.id}`);
        return;
      }

      const novaLista = usuarios.filter((_, index) => index !== indexAtual);
      setUsuarios(novaLista);

      if (indexAtual >= novaLista.length && novaLista.length > 0) {
        setIndexAtual(novaLista.length - 1);
      }
    } catch (error) {
      console.error("Erro ao dar like:", error);
    }
  }

  const usuarioAtual = usuarios.length > 0 ? usuarios[indexAtual] : null;
  const fimDosUsuarios = usuarios.length === 0 && !carregando;

  return {
    usuarios,
    usuarioAtual,
    indexAtual,
    fotoIndex,
    setFotoIndex,
    carregando,
    fimDosUsuarios,
    loadUsers,
    likeUser,
    dislikeUser,
  };
}
