"use client";

import { GetCompanyHours } from "@/api/dashboard/horarios/route";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
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
import { useUser } from "@/context/UserContext";
import { WorkingHourTypeWithId } from "@/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "lodash/debounce";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  search: z.string().optional(),
});

export function HoursList() {
  const [hours, setHours] = useState<WorkingHourTypeWithId[]>([]);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    totalPages: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number;
    prevPage: null | number;
  }>({
    total: 0,
    page: 1,
    totalPages: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: 0,
    prevPage: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  });

  const fetchHours = async (values: z.infer<typeof FormSchema>) => {
    try {
      setIsLoading(true);
      if (!user?._id) {
        throw new Error("User ID is required");
      }

      const {
        success,
        pagination: paginationData,
        hours,
      } = await GetCompanyHours(
        user._id,
        values.search,
        pagination.page.toString(),
      );

      if (success) {
        setHours(hours);
        setPagination(paginationData);
      }
    } catch (error) {
      console.error("Erro ao buscar cargos da empresa:", error);
      toast.error("Não foi possível carregar os cargos da empresa.");
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchHours = useCallback(
    debounce((values: z.infer<typeof FormSchema>) => {
      fetchHours(values);
    }, 500),
    [user?._id],
  );

  useEffect(() => {
    const subscription = form.watch((values) => {
      debouncedFetchHours(values as z.infer<typeof FormSchema>);
    });

    return () => {
      subscription.unsubscribe();
      debouncedFetchHours.cancel();
    };
  }, [form, debouncedFetchHours]);

  useEffect(() => {
    fetchHours(form.getValues());
  }, [form]);

  const handlePageChange = async (newPage: number) => {
    try {
      setIsLoading(true);
      if (!user?._id) {
        throw new Error("User ID is required");
      }

      const {
        success,
        pagination: paginationData,
        hours,
      } = await GetCompanyHours(
        user._id,
        form.getValues("search"),
        newPage.toString(),
      );

      if (success) {
        setHours(hours);
        setPagination(paginationData);
      }
    } catch (error) {
      console.error("Erro ao mudar de página:", error);
      toast.error("Não foi possível carregar a página.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex items-center justify-between"
          onSubmit={form.handleSubmit(fetchHours)}
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel>Buscar:</FormLabel>
                <FormControl>
                  <Input placeholder="buscar horário de trabalho" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Horário de trabalho</TableHead>
              <TableHead>Quantidade de Funcionários</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
                    Carregando...
                  </div>
                </TableCell>
              </TableRow>
            ) : hours.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-muted-foreground h-24 text-center"
                >
                  Nenhum horário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              hours.map((hour) => (
                <TableRow key={hour._id}>
                  <TableCell className="w-1/2">{hour.hour}</TableCell>
                  <TableCell className="flex w-full items-center justify-between">
                    10
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="size-8">
                        <Link href={`hours/${hour._id}`}>
                          <Pencil className="size-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="size-8">
                        <Trash className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <p className="text-muted-foreground text-sm">
          {hours.length > 0 ? (
            <>
              Mostrando{" "}
              {pagination.page === 1 ? 1 : (pagination.page - 1) * 10 + 1}
              {" a "}
              {pagination.page * 10 > pagination.total
                ? pagination.total
                : pagination.page * 10}
              {" de "}
              {pagination.total}
              {" resultados"}
            </>
          ) : (
            "Nenhum resultado encontrado"
          )}
        </p>

        {pagination.totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (pagination.hasPrevPage && pagination.prevPage) {
                      handlePageChange(pagination.prevPage);
                    }
                  }}
                  className={
                    !pagination.hasPrevPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                >
                  Anterior
                </PaginationPrevious>
              </PaginationItem>

              {Array.from({ length: pagination.totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                const shouldShowPage =
                  pageNumber === 1 ||
                  pageNumber === pagination.totalPages ||
                  Math.abs(pageNumber - pagination.page) <= 1;

                if (!shouldShowPage) {
                  if (
                    pageNumber === 2 ||
                    pageNumber === pagination.totalPages - 1
                  ) {
                    return (
                      <PaginationItem key={pageNumber}>
                        <span className="px-2">...</span>
                      </PaginationItem>
                    );
                  }
                  return null;
                }

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={pagination.page === pageNumber}
                      className="cursor-pointer"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (pagination.hasNextPage && pagination.nextPage) {
                      handlePageChange(pagination.nextPage);
                    }
                  }}
                  className={
                    !pagination.hasNextPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                >
                  Próximo
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
}
