import { GetCompanyRoles } from "@/api/dashboard/cargos/route";
import { Metadata } from "next";
import NewEmployeeForm from "./employeeForm";

export const metadata: Metadata = {
  title: "Cadastrar funcionário - Amplo Serviços",
  description: "Página para cadastro de funcionário da amplo serviços",
};

export default async function NewEmployee() {
  const { roles } = await GetCompanyRoles("67bf62f4d4cc5051fdb73f6c");

  return <NewEmployeeForm roles={roles} />;
}
