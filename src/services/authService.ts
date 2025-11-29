import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export async function cadastrarUsuario({ nome, idade, email, senha }) {
  const metodos = await fetchSignInMethodsForEmail(auth, email);

  if (metodos.includes("google.com")) {
    throw new Error(
      "Este email já está vinculado ao Google. Faça login com o Google."
    );
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    senha
  );

  const uid = userCredential.user.uid;

  await setDoc(doc(db, "users", uid), {
    nome,
    idade,
    email,
    createdAt: new Date(),
    provider: "password",
  });

  return uid;
}
