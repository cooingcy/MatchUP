import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="w-full h-16 bg-white shadow flex items-center justify-between px-8">
        <h1 className="text-2xl font-bold text-pink-600">LOGO</h1>
        <button className="px-5 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition">
          Entrar
        </button>
      </nav>

      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center px-4">
        <h2 className="text-3xl font-semibold">Bem-vindo ao Projeto Tinder</h2>

        <Link href="./register">
          <button className="mt-6 px-8 py-3 bg-pink-600 text-white text-lg rounded-xl hover:bg-pink-700 transition">
            Criar Conta
          </button>
        </Link>
      </div>
    </div>
  );
}
