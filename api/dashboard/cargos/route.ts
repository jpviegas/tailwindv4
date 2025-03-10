import { RoleType } from "@/zodSchemas";

type RoleTypeWithId = RoleType & { _id: string };

export async function GetAllRoles(): Promise<{
  count: number;
  roles: RoleTypeWithId[];
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles/`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const data = await res.json();
  return data;
}

export async function GetCompanyRoles(company: string): Promise<{
  count: number;
  roles: RoleTypeWithId[];
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/roles/${company}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    },
  );

  const data = await res.json();
  return data;
}

export async function CreateRole(
  values: RoleType,
): Promise<{ message: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res) {
    throw new Error("Erro ao cadastrar o cargo");
  }

  const data = await res.json();
  return data.message;
}
