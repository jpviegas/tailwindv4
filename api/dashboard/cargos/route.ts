import { RoleType } from "@/zodSchemas";

type RoleTypeWithId = RoleType & { id: string };

export async function GET(): Promise<RoleTypeWithId[]> {
  const res = await fetch(`${process.env.api}/role`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return data;
}

export async function POST(values: RoleType): Promise<RoleTypeWithId> {
  console.log("BE", values);

  const res = await fetch(`${process.env.api}/role`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Erro ao fazer login");
  }

  const data = await res.json();
  return data;
}
