"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const supabase = createClient();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    window.location.href = "/";
  }

  return (
    <nav className="bg-[#8B6B4A] text-white px-8 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          Manolocal
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/">
            Inicio
          </Link>

          <Link href="/publicar">
            Publicar
          </Link>

          {user && (
            <Link href="/dashboard">
              Dashboard
            </Link>
          )}

          {!user && (
            <>
              <Link href="/login">
                Login
              </Link>

              <Link href="/register">
                Registro
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="bg-white text-[#8B6B4A] px-4 py-2 rounded"
            >
              Salir
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}