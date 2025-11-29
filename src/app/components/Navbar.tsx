"use client";

import { useRouter } from "next/navigation";
import {
  UserIcon,
  Bars3Icon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export function Navbar({ showMenuButton = false, setMenuAberto }: any) {
  const router = useRouter();

  return (
    <nav className="w-full h-16 bg-[#1a1a1d]/90 backdrop-blur-md border-b border-white/10 shadow-2xl flex items-center justify-between px-6 fixed top-0 left-0 z-40">
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => router.push("/home")}
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          MatchUP
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={() => router.push("/ChatList")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2a2a2d] hover:bg-[#3a3a3d] text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105 group border border-white/5"
        >
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Conversas</span>
        </button>
      </div>

      <div className="flex items-center gap-4">
        {showMenuButton ? (
          <button
            onClick={() => setMenuAberto(true)}
            className="
              w-10 h-10 flex items-center justify-center 
              bg-gradient-to-r from-pink-500 to-purple-600 
              hover:from-pink-600 hover:to-purple-700 
              text-white rounded-xl 
              transition-all duration-300 transform hover:scale-110 
              shadow-lg border border-white/10
            "
          >
            <Bars3Icon className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => router.push("/account")}
            className="
              flex items-center gap-3 px-4 py-2 
              bg-[#2a2a2d] hover:bg-[#3a3a3d] 
              text-gray-300 hover:text-white 
              rounded-xl transition-all duration-300 
              transform hover:scale-105 group border border-white/5
            "
          >
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">Minha Conta</span>
          </button>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
    </nav>
  );
}
