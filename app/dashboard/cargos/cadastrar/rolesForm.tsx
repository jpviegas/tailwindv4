"use client";

import { CreateRole } from "@/api/dashboard/cargos/route";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerRoleSchema } from "@/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function NewRolesForm() {
  type FormValues = z.infer<typeof registerRoleSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(registerRoleSchema),
    defaultValues: {
      role: "",
      company: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const message = await CreateRole(values);

      if (!message) {
        toast.warning("Não foi possível cadastrar o cargo");
      } else {
        toast.success(`${message}`);
      }
    } catch {
      toast.error("Erro ao cadastrar o cargo.");
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do cargo" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <FormControl>
                  <Input placeholder="Preencha o ID da empresa" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            // onClick={() =>
            //   toast("Não foi possível cadastrar o cargo", {
            //     description:
            //       "falta preencher algum campo ou preencheu errado",
            //   })
            // }
          >
            Salvar
          </Button>
          <Button asChild variant="outline" type="reset">
            <Link href="./">Cancelar</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
