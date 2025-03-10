import { EmployeeType } from "@/zodSchemas";

type EmployeeTypeWithId = EmployeeType & { _id: string };

export async function GetAllEmployees(): Promise<{
  count: number;
  employees: EmployeeTypeWithId[];
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees/`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const data = await res.json();
  return data;
}

export async function GetEmployee(name: string): Promise<{
  count: number;
  employees: EmployeeTypeWithId[];
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/employees/${name}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    },
  );

  const data = await res.json();
  return data;
}

export async function CreateEmployee(
  values: EmployeeType,
): Promise<{ message: string; success: boolean }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employees`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res) {
    throw new Error("Erro ao cadastrar a funcionário");
  }

  const data = await res.json();
  return data;
}
