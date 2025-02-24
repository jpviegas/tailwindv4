import { registerRoleSchema } from "@/types";

export async function GET() {
  const res = await fetch("/api", {
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return Response.json({ data });
}

export async function PostLogin(values: typeof registerRoleSchema) {
  const res = await fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Erro ao fazer login");
  }

  const data = await res.json();

  return Response.json({ data });
}
