"use client";

import { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usr) => {
      if (!usr) {
        router.replace("/");
      } else {
        setUser(usr);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <div className="text-white p-6">Carregando...</div>;

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo, {user?.displayName}</h1>

      <button
        onClick={() => signOut(auth)}
        className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition"
      >
        Sair
      </button>
    </div>
  );
}
