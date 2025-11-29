"use client";
import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
export function useAuth() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usr) => {
      if (!usr) router.replace("/");
      setLoading(false);
    });
    return () => unsub();
  }, []);
  return { loading };
}
