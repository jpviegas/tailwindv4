import { GetCompanyRoles } from "@/api/dashboard/cargos/route";
import NewEmployeeForm from "./novofuncionario";

export default async function NewEmployee() {
  const { roles } = await GetCompanyRoles("67bf62f4d4cc5051fdb73f6c");

  return <NewEmployeeForm roles={roles} />;
}
