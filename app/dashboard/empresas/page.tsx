import { api } from "@/api/fake";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Empresas - Amplo Serviços",
  description: "Página de empresas da amplo serviços",
};

export default async function CompaniesPage() {
  const data = await api.getCompanies();
  return (
    <main className="container mx-auto flex h-full flex-col justify-evenly gap-8">
      <div className="flex items-center justify-between border-b pb-8">
        <h1 className="flex text-2xl font-semibold">Empresas</h1>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={"empresas/cadastrar"}>
              <span>+</span>
              Adicionar
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/2">Nome da Empresa</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Quantidade de Funcionários</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((company) => (
              <TableRow key={company.cnpj}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.cnpj}</TableCell>
                <TableCell className="flex items-center justify-between">
                  {company.employeeQuantity}
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Link href={`empresas/${company.id}`}>
                        <Pencil className="size-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
