import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function HomePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data,
    error,
  } = await supabase
    .from("todos")
    .select("*");

  console.log(data);

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        ManoLocal
      </h1>

      <p className="mt-4">
        Supabase conectado correctamente.
      </p>

      {error && (
        <p className="text-red-500 mt-4">
          Error: {error.message}
        </p>
      )}
    </main>
  );
}