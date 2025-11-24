"use client";

import { Navbar } from "@/app/components/Navbar";
import { SideMenu } from "@/app/components/SideMenu";
import { Profile } from "@/app/components/Profile";
import { useAccount } from "@/services/useAccount";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const acc = useAccount();

  if (acc.loading) return <p className="text-white p-10">Carregando...</p>;

  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white flex flex-col items-center pb-10 relative">
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

      <Profile
        user={acc.user}
        setUser={acc.setUser}
        editando={acc.editando}
        setEditando={acc.setEditando}
        uploading={acc.uploading}
        enviarImagensCloudinary={acc.enviarImagensCloudinary}
        removerFoto={acc.removerFoto}
        salvarEdicoes={acc.salvarEdicoes}
      />
    </div>
  );
}
