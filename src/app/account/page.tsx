"use client";

import { Navbar } from "@/app/components/Navbar";
import { SideMenu } from "@/app/components/SideMenu";
import { Profile } from "@/app/components/Profile";
import { useAccount } from "@/services/useAccount";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const acc = useAccount();

  if (acc.loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0d] text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl text-gray-300">Carregando seu perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white flex flex-col items-center pb-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/10 to-blue-500/5"></div>

      <div className="relative z-10 w-full">
        <Navbar showMenuButton={true} setMenuAberto={acc.setMenuAberto} />

        {acc.menuAberto && (
          <SideMenu
            email={acc.email}
            telefone={acc.telefone}
            setEmail={acc.setEmail}
            setTelefone={acc.setTelefone}
            salvarConta={acc.salvarConta}
            sairDaConta={async () => {
              await acc.sairDaConta();
              router.push("/");
            }}
            fechar={() => acc.setMenuAberto(false)}
          />
        )}

        <div className="pt-24 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
              Meu Perfil
            </h1>
            <p className="text-gray-400">Gerencie suas informações e fotos</p>
          </div>
        </div>

        <div className="px-6 max-w-4xl mx-auto">
          <Profile
            user={acc.user}
            setUser={acc.setUser}
            editando={acc.editando}
            setEditando={acc.setEditando}
            uploading={acc.uploading}
            enviarImagensCloudinary={acc.enviarImagens}
            removerFoto={acc.removerFoto}
            salvarEdicoes={acc.salvarEdicoes}
          />
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-[#1a1a1d]/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
            <span>Seus dados estão protegidos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
