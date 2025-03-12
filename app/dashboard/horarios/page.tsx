import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { HoursList } from "./hoursList";

export default async function Shift() {
  return (
    <main className="container mx-auto flex h-full flex-col justify-evenly gap-8">
      <div className="flex items-center justify-between border-b pb-8">
        <h1 className="flex text-2xl font-semibold">Horários</h1>
        <div className="flex gap-2">
          <Button asChild className="gap-2">
            <Link href={"horarios/cadastrar"}>
              <span>+ Adicionar</span>
            </Link>
          </Button>
          <Popover>
            <Button size="icon">
              <MoreHorizontal className="size-4" />
            </Button>
          </Popover>
        </div>
      </div>

      <HoursList />
    </main>
  );
}
