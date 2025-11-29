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
  setDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";

export function useChat(matchId: string) {
  const [mensagens, setMensagens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchExiste, setMatchExiste] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    if (!matchId) {
      setMensagens([]);
      setLoading(false);
      setMatchExiste(false);
      return;
    }

    const verificarEMontarChat = async () => {
      try {
        setLoading(true);

        const matchDoc = await getDoc(doc(db, "matches", matchId));

        if (!matchDoc.exists()) {
          console.error("Match não encontrado:", matchId);
          if (mountedRef.current) {
            setMatchExiste(false);
            setMensagens([]);
            setLoading(false);
          }
          return;
        }

        if (mountedRef.current) {
          setMatchExiste(true);
        }

        const q = query(
          collection(db, "matches", matchId, "messages"),
          orderBy("timestamp", "asc")
        );

        const unsub = onSnapshot(
          q,
          (snap) => {
            const lista: any[] = [];
            snap.forEach((d) => {
              const data = d.data();
              lista.push({
                id: d.id,
                ...data,
                timestamp: data.timestamp?.toDate?.() || data.timestamp,
              });
            });

            if (mountedRef.current) {
              setMensagens(lista);
              setLoading(false);
            }
          },
          (error) => {
            console.error("Erro no listener de mensagens:", error);
            if (mountedRef.current) {
              setLoading(false);
            }
          }
        );

        return unsub;
      } catch (error) {
        console.error("Erro ao verificar match:", error);
        if (mountedRef.current) {
          setLoading(false);
          setMatchExiste(false);
        }
      }
    };

    const unsubscribe = verificarEMontarChat();

    return () => {
      mountedRef.current = false;
      if (unsubscribe) {
        unsubscribe.then((unsub) => unsub && unsub());
      }
    };
  }, [matchId]);

  async function enviarMensagem(text: string) {
    if (!text.trim() || !matchId) return;

    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.error("Usuário não autenticado");
      return;
    }

    try {
      const msgData = {
        sender: uid,
        text: text.trim(),
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "matches", matchId, "messages"), msgData);

      await setDoc(
        doc(db, "matches", matchId),
        {
          lastMessage: {
            sender: uid,
            text: text.trim(),
            timestamp: serverTimestamp(),
          },
          lastUpdated: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  }

  return { mensagens, enviarMensagem, loading, matchExiste };
}
