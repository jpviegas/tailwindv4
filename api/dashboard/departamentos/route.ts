import { DepartmentType } from "@/zodSchemas";

type DepartmentTypeWithId = DepartmentType & { _id: string };

export async function GetAllDepartments(): Promise<{
  count: number;
  departments: DepartmentTypeWithId[];
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/departments/`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const data = await res.json();
  return data;
}

export async function GetCompanyDepartments(department: string): Promise<{
  count: number;
  departments: DepartmentTypeWithId[];
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/departments/${department}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    },
  );

  const data = await res.json();
  return data;
}

export async function CreateDepartment(
  values: DepartmentType,
): Promise<{ message: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/departments`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Erro ao cadastrar o departamento");
  }

  const data = await res.json();
  return data.message;
}
