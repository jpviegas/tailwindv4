import { CompanyType } from "@/zodSchemas";

type CompaniesTypeWithId = CompanyType & { _id: string };

export async function GetAllCompanies(): Promise<{
  count: number;
  companies: CompaniesTypeWithId[];
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies/`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });

  const data = await res.json();
  return data;
}

export async function GetCompanyByName(company: string): Promise<{
  count: number;
  company: CompaniesTypeWithId[];
}> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/companies/${company}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
    },
  );

  const data = await res.json();
  return data;
}

export async function CreateCompany(
  values: CompanyType,
): Promise<{ message: string; success: boolean }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!res) {
    throw new Error("Erro ao cadastrar a empresa");
  }

  const data = await res.json();
  return data;
}
