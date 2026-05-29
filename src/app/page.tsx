import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("todos")
    .select("*");

  console.log(data);

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-5xl font-bold mb-6 text-[#8B6B4A]">
        Manolocal
      </h1>

      <p className="text-lg mb-10">
        Plataforma de servicios locales
      </p>

      <div className="space-y-4">
        {data?.map((todo) => (
          <div
            key={todo.id}
            className="border p-4 rounded"
          >
            {todo.name}
          </div>
        ))}
      </div>
    </main>
  );
}