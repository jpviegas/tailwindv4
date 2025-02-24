import { loginSchema } from "@/types";

export async function GET() {
  const res = await fetch("/api", {
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return Response.json({ data });
}

export async function PostLogin(values: typeof loginSchema) {
  const response = await fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Erro ao fazer login");
  }
}
