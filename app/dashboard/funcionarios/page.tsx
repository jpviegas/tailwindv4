import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Metadata } from "next";
// import Link from "next/link";
// import { EmployeesList } from "./employeesList";

export const metadata: Metadata = {
  title: "Funcionários - Amplo Serviços",
  description: "Página de funcionários da amplo serviços",
};

export default async function EmployeesPage() {
  return (
    <main className="container mx-auto flex h-full flex-col justify-evenly gap-8">
      <div className="flex items-center justify-between border-b pb-8">
        <h1 className="flex text-2xl font-semibold">Funcionários</h1>
        <div className="flex gap-2">
          {/* <Button asChild className="gap-2">
            <Link href={"funcionarios/cadastrar"}>
              <span>+ Adicionar</span>
            </Link>
          </Button> */}
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </div>

      {/* <EmployeesList /> */}
    </main>
  );
}
