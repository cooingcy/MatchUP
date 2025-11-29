import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function loginWithEmail(email: string, senha: string) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, senha);

    const uid = res.user.uid;
    const snap = await getDoc(doc(db, "users", uid));

    return {
      ok: true,
      user: snap.exists() ? snap.data() : null,
      uid,
    };
  } catch (err: any) {
    return {
      ok: false,
      error: err.message,
    };
  }
}
