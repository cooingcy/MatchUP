"use client";

import { useEffect, useState } from "react";
import { db, auth } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { uploadToCloudinary } from "@/config/cloudinary";
import { updateEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { deleteFromCloudinary } from "@/config/cloudinary";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    fotos: [],
    nome: "",
    idade: 18,
    sobre: "",
    altura: "",
    cidade: "",
    linguas: [""],
  });

  const [editando, setEditando] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // BUSCAR DADOS DO USUÁRIO
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userLogged) => {
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
            fotos: data.fotos && data.fotos.length > 0 ? data.fotos : [],
            nome: data.nome || "",
            sobre: data.sobre || "Escreva algo sobre você...",
            altura: data.altura || "",
            cidade: data.cidade || "",
            linguas: data.linguas || ["Português"],
          });
        }
      } catch (e) {
        console.log("Erro ao buscar:", e);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ENVIAR FOTOS PARA O CLOUDINARY
  async function enviarImagensCloudinary(files) {
    setUploading(true);

    const novas = [...user.fotos];

    for (let file of files) {
      const url = await uploadToCloudinary(file);
      novas.push(url);
    }

    if (novas.length > 4) novas.splice(4);

    setUser({ ...user, fotos: novas });
    setUploading(false);
  }

  // SALVAR PERFIL (CAMPOS DO CARD)
  async function salvarEdicoes() {
    if (user.fotos.length === 0) {
      alert("É obrigatório ter ao menos uma imagem.");
      return;
    }

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      await updateDoc(doc(db, "users", userId), {
        fotos: user.fotos,
        nome: user.nome,
        sobre: user.sobre,
        altura: user.altura,
        cidade: user.cidade,
        linguas: user.linguas,
      });

      setEditando(false);
    } catch (e) {
      console.log("Erro ao salvar:", e);
    }
  }

  async function sairDaConta() {
    try {
      await auth.signOut();
      router.push("/");
    } catch (e) {
      console.log("Erro ao sair:", e);
    }
  }

  async function salvarConta() {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    try {
      // Atualiza no Firestore
      await updateDoc(doc(db, "users", userId), {
        telefone,
      });

      await updateEmail(auth.currentUser, email);

      alert("Dados da conta atualizados!");
      setMenuAberto(false);
    } catch (e) {
      console.log("Erro:", e);
      alert("Erro ao salvar alterações");
    }
  }

  async function removerFoto(index) {
    const fotoUrl = user.fotos[index];

    // remove do estado
    const novas = user.fotos.filter((_, i) => i !== index);
    setUser({ ...user, fotos: novas });

    // deleta do Cloudinary
    await deleteFromCloudinary(fotoUrl);

    // salva no banco
    const userId = auth.currentUser?.uid;
    if (userId) {
      await updateDoc(doc(db, "users", userId), {
        fotos: novas,
      });
    }
  }

  if (loading) return <p className="text-white p-10">Carregando...</p>;

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white flex flex-col items-center pb-10 relative">
      <nav className="w-full h-16 bg-[#111113] border-b border-white/10 shadow flex items-center justify-between px-6 fixed top-0 left-0 z-20">
        <h1
          className="text-2xl font-bold text-pink-500 cursor-pointer"
          onClick={() => router.push("/home")}
        >
          MatchUP
        </h1>

        <div className="flex items-center gap-6">
          {/* BOTÃO ACCOUNT */}
          <button
            onClick={() => router.push("/account")}
            className="text-white hover:text-pink-400 transition text-lg"
          >
            👤 Account
          </button>
          <button
            onClick={() => setMenuAberto(true)}
            className="text-white text-xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {menuAberto && (
        <div className="fixed top-0 right-0 h-full w-72 bg-[#141416] shadow-2xl border-l border-white/10 p-5 transition-transform duration-300 z-50">
          <h2 className="text-xl font-bold mb-6">Sua conta</h2>

          <label className="text-sm text-gray-400">E-mail</label>
          <input
            type="email"
            className="w-full bg-[#1b1b1d] px-3 py-2 rounded-lg mb-4 mt-1 border border-white/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm text-gray-400">Telefone</label>
          <input
            type="text"
            className="w-full bg-[#1b1b1d] px-3 py-2 rounded-lg mb-6 mt-1 border border-white/10"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={salvarConta}
              className="bg-pink-600 hover:bg-pink-700 w-full py-2 rounded-lg font-semibold"
            >
              Salvar
            </button>

            <button
              onClick={sairDaConta}
              className="bg-red-600 hover:bg-red-700 w-full py-2 rounded-lg font-semibold"
            >
              Sair da conta
            </button>

            <button
              onClick={() => setMenuAberto(false)}
              className="text-gray-400 hover:text-gray-200 mt-2"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="w-full h-60 bg-[#111113] relative flex items-center justify-center overflow-x-auto gap-3 px-3 mt-24">

        {user.fotos.length > 0 ? (
          <div className="flex gap-3">
            {user.fotos.map((f, i) => (
              <div key={i} className="relative">
                <img
                  src={f}
                  className="w-40 h-52 rounded-xl object-cover border border-white/10 shadow"
                />

                {editando && (
                  <button
                    onClick={() => removerFoto(i)}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Nenhuma imagem selecionada</p>
        )}

        {editando && (
          <label className="absolute bottom-4 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-full text-sm cursor-pointer">
            {uploading ? "Enviando..." : "Selecionar imagens"}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => enviarImagensCloudinary(e.target.files)}
            />
          </label>
        )}
      </div>

      <div className="mt-6 w-[90%] max-w-md bg-[#141416] rounded-2xl p-5 shadow-xl border border-white/10 relative">
        {editando ? (
          <input
            className="bg-transparent border-b border-gray-600 px-1 text-xl font-bold"
            value={user.nome}
            onChange={(e) => setUser({ ...user, nome: e.target.value })}
          />
        ) : (
          <h1 className="text-2xl font-bold">{user.nome}</h1>
        )}

        <div className="mt-6">
          <p className="text-sm text-gray-400">Sobre mim</p>

          {editando ? (
            <textarea
              className="w-full bg-[#1b1b1d] mt-2 p-3 rounded-xl border border-white/10 text-gray-200"
              value={user.sobre}
              onChange={(e) => setUser({ ...user, sobre: e.target.value })}
            />
          ) : (
            <div className="bg-[#1b1b1d] mt-2 p-4 rounded-xl border border-white/5">
              <p className="text-gray-200">{user.sobre}</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-400 mb-2">Informações básicas</p>

          <div className="bg-[#1b1b1d] p-4 rounded-xl border border-white/5 space-y-3">
            <p className="flex items-center gap-2 text-gray-200">
              📏
              {editando ? (
                <input
                  className="bg-transparent border-b border-gray-600 px-1"
                  value={user.altura}
                  onChange={(e) => setUser({ ...user, altura: e.target.value })}
                />
              ) : (
                <span>{user.altura}</span>
              )}
            </p>

            <p className="flex items-center gap-2 text-gray-200">
              📍
              {editando ? (
                <input
                  className="bg-transparent border-b border-gray-600 px-1"
                  value={user.cidade}
                  onChange={(e) => setUser({ ...user, cidade: e.target.value })}
                />
              ) : (
                <span>{user.cidade}</span>
              )}
            </p>

            <p className="flex items-center gap-2 text-gray-200">
              🗣️
              {editando ? (
                <input
                  className="bg-transparent border-b border-gray-600 px-1"
                  value={user.linguas.join(", ")}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      linguas: e.target.value.split(",").map((v) => v.trim()),
                    })
                  }
                />
              ) : (
                <span>{user.linguas.join(", ")}</span>
              )}
            </p>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <button
            className="absolute -bottom-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full shadow-lg text-center font-semibold transition"
            onClick={() => (editando ? salvarEdicoes() : setEditando(true))}
          >
            {editando ? "Salvar" : "Editar perfil"}
          </button>
        </div>
      </div>
    </div>
  );
}
