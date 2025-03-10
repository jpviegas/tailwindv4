import { DepartmentType, DepartmentTypeWithId } from "@/zodSchemas";

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

export async function GetCompanyDepartments(
  company: string,
  department?: string,
  page?: string,
): Promise<{
  success: boolean;
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number;
    prevPage: null | number;
  };
  departments: DepartmentTypeWithId[];
}> {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/departments/${company}`;

  const queryParams = new URLSearchParams();

  if (department) {
    queryParams.append("department", department);
  }
  if (page) {
    queryParams.append("page", page);
  }

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

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

  if (!res) {
    throw new Error("Erro ao cadastrar a departamento");
  }

  const data = await res.json();
  return data.message;
}
