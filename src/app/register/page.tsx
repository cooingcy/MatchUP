export default function CadastroPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Criar Conta
        </h1>

        <form className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Nome</label>
            <input
              type="text"
              placeholder="Seu nome"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Idade</label>
            <input
              type="number"
              min={18}
              placeholder="Sua idade"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Seu email"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Senha</label>
            <input
              type="password"
              placeholder="Crie uma senha"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Bio</label>
            <textarea
              placeholder="Fale um pouco sobre você..."
              className="w-full border rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            Criar Conta
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Já tem uma conta?{" "}
          <a href="/login" className="text-pink-600 font-semibold">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
