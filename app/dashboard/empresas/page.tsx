import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { CompaniesList } from "./companiesList";

export const metadata: Metadata = {
  title: "Empresas - Amplo Serviços",
  description: "Página de empresas da amplo serviços",
};

export default async function CompaniesPage() {
  return (
    <main className="container mx-auto flex h-full flex-col justify-evenly gap-8">
      <div className="flex items-center justify-between border-b pb-8">
        <h1 className="flex text-2xl font-semibold">Empresas</h1>
        <div className="flex gap-2">
          <Button asChild className="gap-2">
            <Link href={"empresas/cadastrar"}>
              <span>+ Adicionar</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </div>

      <CompaniesList />
    </main>
  );
}
