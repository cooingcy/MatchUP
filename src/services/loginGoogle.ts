import { auth, db } from "@/config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        uid: user.uid,
        nome: user.displayName || "",
        email: user.email,
        fotos: [user.photoURL],
        sobre: "Escreva algo sobre você...",
        altura: "",
        cidade: "",
        linguas: ["Português"],
        criadoEm: Date.now(),
      });
    }

    return { ok: true, user };
  } catch (e) {
    console.log("Erro login:", e);
    return { ok: false };
  }
}
