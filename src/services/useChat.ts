"use client";

import { useEffect, useState, useRef } from "react";
import { auth, db } from "@/config/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

export function useChat(matchId: string) {
  const [mensagens, setMensagens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    if (!matchId) {
      setMensagens([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "matches", matchId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const lista: any[] = [];
      snap.forEach((d) => lista.push({ id: d.id, ...d.data() }));
      if (mountedRef.current) {
        setMensagens(lista);
        setLoading(false);
      }
    });

    return () => {
      mountedRef.current = false;
      unsub();
    };
  }, [matchId]);

  async function enviarMensagem(text: string) {
    if (!text || !text.trim()) return;

    const uid = auth.currentUser?.uid;
    const msg = {
      sender: uid,
      text: text.trim(),
      timestamp: Date.now(),
    };

    // salva mensagem
    await addDoc(collection(db, "matches", matchId, "messages"), msg);

    // atualiza lastMessage no match (útil pra lista)
    const matchRef = doc(db, "matches", matchId);
    await updateDoc(matchRef, {
      lastMessage: { text: msg.text, sender: uid, timestamp: msg.timestamp },
    });
  }

  return { mensagens, enviarMensagem, loading };
}
