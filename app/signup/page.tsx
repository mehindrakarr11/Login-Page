"use client";

import { db } from "../../firebase/config";

import { useRouter } from "next/navigation";

import {
  doc,
  setDoc
} from "firebase/firestore";

import {
  auth
} from "../../firebase/config";

import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

import Link from "next/link";

import { useState } from "react";

export default function LoginPage() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {

    if (password.length < 8) {

      setPasswordError("Please enter at least 8 characters");

      return;

    }

    setPasswordError("");

    setLoading(true);

    try {

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name
      });

      await setDoc(

        doc(db, "users", userCredential.user.uid),

        {
          username: name,
          email: email,
          createdAt: new Date(),
        }

      );

      router.push("/");

    } catch (error) {

      console.log(error);

      setLoading(false);

      alert("Signup Failed");

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-black">

      <form

        onSubmit={(e) => {

          e.preventDefault();

          handleLogin();

        }}

        className="bg-zinc-900 p-8 rounded-xl w-full max-w-md"

      >

        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Sign-up
        </h1>

        <input
          type="text"
          placeholder="Enter Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-zinc-800 text-white outline-none"
        />

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
          className="w-full p-3 mb-2 rounded bg-zinc-800 text-white outline-none"
        />

        {passwordError && (

          <p className="text-red-500 text-sm mb-4">

            {passwordError}

          </p>

        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded font-semibold"
        >

          {loading ? "Loading..." : "Sign-up"}

        </button>

        <p className="text-white text-lg mt-4 font-semibold">

          Already have account?{" "}

          <Link
            href="/login"
            className="text-red-600 hover:text-red-700"
          >
            Log-in
          </Link>

        </p>

      </form>

    </div>

  );

}