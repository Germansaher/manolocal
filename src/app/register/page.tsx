"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function RegisterPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    console.log(data);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Usuario creado correctamente");
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md p-8 bg-white rounded-xl"
      >
        <h1 className="text-3xl font-bold mb-6">
          Registro
        </h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 mb-4"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 mb-4"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3"
        >
          Crear cuenta
        </button>
      </form>
    </main>
  );
}