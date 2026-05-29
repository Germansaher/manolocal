"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function PublicarPage() {
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Obtener usuario autenticado
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Verificar login
    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    // Insertar servicio en Supabase
    const { error } = await supabase
      .from("services")
      .insert([
        {
          user_id: user.id,
          title,
          description,
          category,
          city,
          price,
        },
      ]);

    // Manejo de errores
    if (error) {
      console.log(error);
      alert("Error al publicar");
      return;
    }

    // Éxito
    alert("Servicio publicado correctamente");

    // Limpiar formulario
    setTitle("");
    setDescription("");
    setCategory("");
    setCity("");
    setPrice("");
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8 text-[#8B6B4A]">
        Publicar Servicio
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-4"
      >
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-[#8B6B4A] text-white px-6 py-3 rounded"
        >
          Publicar
        </button>
      </form>
    </main>
  );
}