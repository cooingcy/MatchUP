"use client";

import { useRouter } from "next/navigation";
import { UserIcon, Bars3Icon } from "@heroicons/react/24/solid";

export function Navbar({ showMenuButton = false, setMenuAberto }: any) {
  const router = useRouter();

  return (
    <nav className="w-full h-16 bg-[#111113] border-b border-white/10 shadow flex items-center justify-between px-6 fixed top-0 left-0 z-20">
      <h1
        className="text-2xl font-bold text-pink-500 cursor-pointer"
        onClick={() => router.push("/home")}
      >
        MatchUP
      </h1>

      <h1
        className="text-2xl font-bold text-pink-500 cursor-pointer"
        onClick={() => router.push("/ChatList")}
      >
        Chats
      </h1>

      {showMenuButton ? (
        <button onClick={() => setMenuAberto(true)} className="text-pink-500">
          <Bars3Icon className="w-7 h-7 text-lg" />
        </button>
      ) : (
        <button
          onClick={() => router.push("/account")}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <UserIcon className="w-7 h-7 text-pink-500" />
          <span className="text-pink-500 text-lg">Conta</span>
        </button>
      )}
    </nav>
  );
}
