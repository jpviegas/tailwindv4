import { LoginType } from "@/zodSchemas";

export async function GET(): Promise<LoginType[]> {
  const res = await fetch(`${process.env.api}/admin`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const data = await res.json();
  return data;
}

export async function PostLogin(values: LoginType) {
  const response = await fetch(`${process.env.api}/admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Erro ao fazer login");
  }
}
