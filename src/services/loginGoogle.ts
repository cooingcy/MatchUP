"use client";

import { auth, db, googleProvider } from "../config/firebase";
import { signInWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setCookie } from "cookies-next";

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const metodos = await fetchSignInMethodsForEmail(auth, user.email);

    if (metodos.includes("password") && !metodos.includes("google.com")) {
      throw new Error(
        "Este email foi cadastrado usando email e senha. Use login manual."
      );
    }

    const token = await user.getIdToken();
    setCookie("firebaseAuthToken", token, { maxAge: 60 * 60 * 24 * 7 });

    const ref = doc(db, "users", user.uid);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      await setDoc(ref, {
        nome: user.displayName,
        email: user.email,
        foto: user.photoURL,
        provider: "google",
        createdAt: new Date(),
      });
    }

    return { ok: true, user };
  } catch (error: any) {
    console.log(error);
    return { ok: false, error: error.message };
  }
}
