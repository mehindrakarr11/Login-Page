"use client";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { useRouter } from "next/navigation";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

import Link from "next/link";

import { useState } from "react";

export default function LoginPage() {

    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = async () => {

      try {

        await signInWithPopup(auth, provider);

        router.push("/");

      } catch (error) {

        console.log(error);

        alert("Google Login Failed");

      }

    };
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = async () => {

      try {

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log(userCredential.user);

        router.push("/");

      } catch (error) {

        console.log(error);

        alert("Invalid Credentials");

      }

    };

  return (

    <div className="flex items-center justify-center min-h-screen bg-black">
      
      <div className="bg-zinc-900 p-8 rounded-xl w-[400px]">
        
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded bg-zinc-800 text-white outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded font-semibold"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-zinc-100 hover:bg-zinc-300 text-black p-3 rounded font-semibold mt-4 flex items-center justify-center gap-3 transition"
        >

          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />

          Continue with Google

        </button>

        <p className="text-white text-lg mt-4 font-semibold"> New User?{" "}
            <Link href="/signup" className="text-red-600 hover:text-red-700">
                Sign-up
            </Link>
        </p>

      </div>

    </div>
  );
};