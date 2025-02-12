import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaRegClock, FaUsers } from "react-icons/fa6";
import { LiaClipboardCheckSolid } from "react-icons/lia";

export default async function QuickPanel() {
  return (
    <Card className="flex w-full flex-col gap-4 rounded-lg border p-6 shadow-lg lg:w-2/3">
      <CardTitle>
        <h1 className="border-b-2 text-2xl font-bold">Painel rápido</h1>
      </CardTitle>
      <CardDescription>
        <h2>Opções rápidas de navegação pelo sistema</h2>
      </CardDescription>
      <CardContent className="grid grid-cols-2 gap-8 md:grid-cols-3">
        <Button asChild variant="outline" className="h-24">
          <Link
            href="dashboard/funcionarios"
            className="flex flex-col justify-evenly"
          >
            <FaUsers className="size-12" />
            <p className="text-center">Funcionários</p>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-24">
          <Link
            href="dashboard/horarios"
            className="flex flex-col justify-evenly"
          >
            <FaRegClock className="size-12" />
            <p className="text-center">Horários</p>
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-24">
          <Link
            href="dashboard/cartao"
            className="flex flex-col justify-evenly"
          >
            <LiaClipboardCheckSolid className="size-12" />
            <p className="text-center">Cartão de ponto</p>
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
