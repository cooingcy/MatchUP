"use client";

import { useState } from "react";
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

  async function loadUsers() {
    const snap = await getDocs(collection(db, "users"));
    const lista: any[] = [];

    snap.forEach((d) => lista.push({ id: d.id, ...d.data() }));

    const filtrado = lista.filter((u) => u.id !== auth.currentUser?.uid);
    setUsuarios(filtrado);
  }

  function proximoUsuario() {
    setFotoIndex(0);
    setIndexAtual((prev) => Math.min(prev + 1, usuarios.length - 1));
  }

  async function dislikeUser() {
    const meuId = auth.currentUser?.uid;
    const outroId = usuarios[indexAtual].id;

    await setDoc(doc(db, "users", meuId, "dislikes", outroId), {
      disliked: true,
    });

    proximoUsuario();
  }

  async function likeUser() {
    const meuId = auth.currentUser?.uid;
    const outroId = usuarios[indexAtual].id;

    // salva like
    await setDoc(doc(db, "users", meuId, "likes", outroId), { liked: true });

    // verifica match
    const snap = await getDoc(doc(db, "users", outroId, "likes", meuId));

    if (snap.exists()) {
      const matchRef = await addDoc(collection(db, "matches"), {
        users: [meuId, outroId],
        timestamp: Date.now(),
      });

      router.push(`/match?id=${matchRef.id}`);
    }

    proximoUsuario();
  }

  return {
    usuarios,
    indexAtual,
    fotoIndex,
    setFotoIndex,
    loadUsers,
    likeUser,
    dislikeUser,
  };
}
