"use client";

import { useChatList } from "@/services/useChatList";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";

export default function ChatsListPage() {
  const { chats } = useChatList();
  const router = useRouter();

  return (
    <div className="pt-20 p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Seus chats</h1>

      <div className="flex flex-col gap-3">
        {chats.length === 0 && (
          <div className="text-gray-400">Nenhum chat ainda.</div>
        )}

        {chats.map((c) => (
          <div
            key={c.matchId}
            onClick={() => router.push(`/chat?id=${c.matchId}`)}
            className="flex items-center gap-4 bg-[#141416] p-3 rounded-xl hover:bg-[#1c1c1f] cursor-pointer"
          >
            <img
              src={c.usuario.fotos?.[0] || "/avatar-placeholder.png"}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <h2 className="font-semibold truncate">{c.usuario.nome}</h2>
                <span className="text-xs text-gray-400">
                  {c.lastMessage
                    ? new Date(c.lastMessage.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>

              <p className="text-sm text-gray-400 truncate">
                {c.lastMessage?.text || "Clique para iniciar a conversa"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
