import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <div className="mt-6">
        <p>
          Bienvenido:
        </p>

        <p className="font-semibold">
          {user.email}
        </p>
      </div>
    </main>
  );
}