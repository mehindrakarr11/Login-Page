"use client";

import { useAuth } from "./context/AuthContext";

import { signOut } from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import { db } from "../firebase/config";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { auth } from "../firebase/config";

export default function HomePage() {

  
  const router = useRouter();

  const { user, loading } = useAuth();

  const [userEmail, setUserEmail] = useState("");

  const [createdAt, setCreatedAt] = useState("");

  const handleLogout = async () => {

    await signOut(auth);

    router.push("/login");

  };

  useEffect(() => {

    if (!loading && !user) {

      router.push("/login");

    }

  }, [user, loading]);

  useEffect(() => {

    const fetchUserData = async () => {

      if (!user) return;

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {

        await setDoc(

          doc(db, "users", user.uid),

          {
            username: user.displayName || "User",
            email: user.email,
            createdAt: new Date(),
          }

        );

      }

      const updatedDocSnap = await getDoc(docRef);

      if (updatedDocSnap.exists()) {

        const userData = updatedDocSnap.data();

        setUserEmail(userData.username);

        setCreatedAt(
          userData.createdAt.toDate().toLocaleDateString()
        );

      }

    };

    fetchUserData();

  }, [user]);

  if (loading) {

    return (

      <div className="min-h-screen bg-black flex items-center justify-center text-white text-3xl">

        Loading...

      </div>

    );

  }

  return (

    <div className="flex flex-col min-h-screen bg-black text-white items-center justify-center">

      <h1 className="text-5xl font-bold">
        Welcome To ComediansClub 🔥
      </h1>

      <p className="text-zinc-400 mt-4 text-lg">
        Logged in as: {userEmail}
      </p>
      <p className="text-zinc-500 mt-2">
          Account Created: {createdAt}
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded text-white font-semibold mt-8"
      >
        Logout
      </button>

    </div>

  );

}