import { useEffect, useState } from "react";
import { auth, db } from "@/config/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export function useChatList() {
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const myLikesSnap = await getDocs(collection(db, "users", uid, "likes"));
      const matches: any[] = [];

      for (const d of myLikesSnap.docs) {
        const otherId = d.id;
        const backLike = await getDoc(doc(db, "users", otherId, "likes", uid));
        if (!backLike.exists()) continue;

        const otherUserSnap = await getDoc(doc(db, "users", otherId));
        if (!otherUserSnap.exists()) continue;

        matches.push({ matchId: otherId, usuario: otherUserSnap.data() });
      }

      setChats(matches);
    }

    load();
  }, []);

  return { chats };
}
