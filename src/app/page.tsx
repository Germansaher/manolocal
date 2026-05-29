import { createClient } from "@/utils/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  console.log(services);

  return (
    <main className="min-h-screen bg-[#f8f5f1] p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-[#8B6B4A] mb-4">
          Manolocal
        </h1>

        <p className="text-gray-700 mb-10 text-lg">
          Encuentra servicios locales cerca de ti
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow p-6 border"
            >
              <h2 className="text-2xl font-semibold mb-3">
                {service.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {service.description}
              </p>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">
                    Categoría:
                  </span>{" "}
                  {service.category}
                </p>

                <p>
                  <span className="font-semibold">
                    Ciudad:
                  </span>{" "}
                  {service.city}
                </p>

                <p>
                  <span className="font-semibold">
                    Precio:
                  </span>{" "}
                  ${service.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {services?.length === 0 && (
          <p className="mt-10 text-gray-500">
            No hay servicios publicados todavía.
          </p>
        )}
      </div>
    </main>
  );
}