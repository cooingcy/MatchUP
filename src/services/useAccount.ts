"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { uploadToCloudinary, deleteFromCloudinary } from "@/config/cloudinary";
import { updateEmail } from "firebase/auth";
import { useRouter } from "next/navigation";

export function useAccount() {
  const router = useRouter();

  const [user, setUser] = useState<any>({
    fotos: [],
    nome: "",
    idade: "",
    sobre: "",
    altura: "",
    cidade: "",
    linguas: [""],
  });

  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (userLogged) => {
      if (!userLogged) {
        setLoading(false);
        return;
      }

      try {
        const ref = doc(db, "users", userLogged.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          setEmail(userLogged.email || "");
          setTelefone(data.telefone || "");

          setUser({
            fotos: data.fotos || [],
            nome: data.nome || "",
            idade: data.idade || "",
            sobre: data.sobre || "",
            altura: data.altura || "",
            cidade: data.cidade || "",
            linguas: data.linguas || ["Português"],
          });
        }
      } catch (e) {
        console.log(e);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  async function enviarImagens(files: FileList | null) {
    if (!files) return;
    setUploading(true);

    let novas = [...user.fotos];

    for (let f of files) {
      const url = await uploadToCloudinary(f);
      novas.push(url);
    }

    if (novas.length > 4) novas = novas.slice(0, 4);

    setUser((prev: any) => ({ ...prev, fotos: novas }));
    setUploading(false);
  }

  async function removerFoto(i: number) {
    const url = user.fotos[i];

    const novas = user.fotos.filter((_, idx) => idx !== i);
    setUser({ ...user, fotos: novas });

    await deleteFromCloudinary(url);

    const uid = auth.currentUser?.uid;
    if (uid) {
      await updateDoc(doc(db, "users", uid), { fotos: novas });
    }
  }

  async function salvarEdicoes() {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    await updateDoc(doc(db, "users", uid), {
      fotos: user.fotos,
      nome: user.nome,
      idade: user.idade,
      sobre: user.sobre,
      altura: user.altura,
      cidade: user.cidade,
      linguas: user.linguas,
    });

    setEditando(false);
  }

  async function salvarConta() {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    await updateDoc(doc(db, "users", uid), { telefone });
    await updateEmail(auth.currentUser!, email);

    setMenuAberto(false);
  }

  async function sairDaConta() {
    await auth.signOut();
    router.push("/");
  }

  return {
    user,
    setUser,
    email,
    setEmail,
    telefone,
    setTelefone,
    loading,
    editando,
    setEditando,
    uploading,
    enviarImagens,
    removerFoto,
    salvarEdicoes,
    salvarConta,
    menuAberto,
    setMenuAberto,
    sairDaConta,
  };
}
