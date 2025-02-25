"use client";

// import { api } from "@/api/fake";
import { GET } from "@/api/route";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("");
    try {
      // const accounts = await api.getAccount();
      const getacc = await GET();

      const user = getacc.find((account) => account.email === values.email);

      if (!user) {
        setError("Email ou senha incorretos");
        return;
      }

      if (user.password === values.password) {
        toast("Login realizado com sucesso.");
        router.push("/dashboard");
      } else {
        toast("Login realizado com sucesso.");
        setError("Email ou senha incorretos");
      }
    } catch {
      setError("Ocorreu um erro ao tentar fazer login");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Amplo Serviços</CardTitle>
        <CardDescription>Acesso ao sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu email"
                      type="email"
                      required
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Digite sua senha"
                        type={showPassword ? "text" : "password"}
                        required
                        disabled={form.formState.isSubmitting}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4 hover:cursor-pointer" />
                        ) : (
                          <Eye className="size-4 hover:cursor-pointer" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="text-destructive text-center text-sm">{error}</p>

            <Link href="#" className={buttonVariants({ variant: "link" })}>
              Esqueceu sua senha?
            </Link>

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  Entrando...
                  <LoaderCircleIcon className="animate-spin" />
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
