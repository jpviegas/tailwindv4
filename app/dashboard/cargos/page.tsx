import { GetAllRoles } from "@/api/dashboard/cargos/route";
import { EmployeeFilterForm } from "@/app/dashboard/funcionarios/filterForm";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  title: "Cargos - Amplo Serviços",
  description: "Página de cargos da amplo serviços",
};

export default async function JobRolesPage() {
  const { count, roles } = await GetAllRoles();

  return (
    <main className="container mx-auto flex h-full flex-col justify-evenly gap-8">
      <div className="flex items-center justify-between border-b pb-8">
        <h1 className="flex text-2xl font-semibold">Cargos</h1>
        <div className="flex gap-2">
          <Button asChild className="gap-2">
            <Link href={"cargos/cadastrar"}>
              <span>+ Adicionar</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </div>

      <EmployeeFilterForm />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cargo</TableHead>
              <TableHead>Quantidade de Funcionários</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((job) => (
              <TableRow key={job._id}>
                <TableCell className="w-1/2">{job.role}</TableCell>
                <TableCell className="flex w-full items-center justify-between">
                  10
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="size-8">
                      <Link href={`funcionarios/${job._id}`}>
                        <Pencil className="size-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8">
                      <Trash className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="text-muted-foreground text-sm">1 a 10 de {count}</div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">9</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
