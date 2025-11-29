import { useEffect, useState } from "react";
import { auth, db } from "@/config/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export function useChatList() {
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        setLoading(false);
        return;
      }

      try {
        const matchesSnap = await getDocs(collection(db, "matches"));
        const matchesList: any[] = [];

        for (const matchDoc of matchesSnap.docs) {
          const matchData = matchDoc.data();

          if (!matchData.users?.includes(uid)) continue;

          const otherUserId = matchData.users.find((id: string) => id !== uid);
          if (!otherUserId) continue;

          const otherUserSnap = await getDoc(doc(db, "users", otherUserId));
          if (!otherUserSnap.exists()) continue;

          matchesList.push({
            matchId: matchDoc.id,
            usuario: otherUserSnap.data(),
            lastMessage: matchData.lastMessage,
            timestamp: matchData.timestamp,
            lastUpdated: matchData.lastUpdated,
          });
        }

        matchesList.sort((a, b) => {
          const timeA =
            a.lastUpdated?.toDate?.() || a.lastUpdated || a.timestamp;
          const timeB =
            b.lastUpdated?.toDate?.() || b.lastUpdated || b.timestamp;
          return new Date(timeB).getTime() - new Date(timeA).getTime();
        });

        setChats(matchesList);
      } catch (error) {
        console.error("Erro ao carregar chats:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { chats, loading };
}
