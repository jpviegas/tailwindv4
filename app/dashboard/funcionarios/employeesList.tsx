// "use client";

// // import { GetEmployees } from "@/api/dashboard/funcionarios/route";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useUser } from "@/context/UserContext";
// // import { EmployeeTypeWithId } from "@/zodSchemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import debounce from "lodash/debounce";
// import { Pencil, Trash } from "lucide-react";
// import Link from "next/link";
// import { useCallback, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { z } from "zod";

// const FormSchema = z.object({
//   search: z.string().optional(),
//   filter: z.string().optional(),
// });

// export function EmployeesList() {
//   const [employees, setEmployees] = useState<EmployeeTypeWithId[]>([]);
//   const [pagination, setPagination] = useState<{
//     total: number;
//     page: number;
//     totalPages: number;
//     limit: number;
//     hasNextPage: boolean;
//     hasPrevPage: boolean;
//     nextPage: number;
//     prevPage: null | number;
//   }>({
//     total: 0,
//     page: 1,
//     totalPages: 0,
//     limit: 10,
//     hasNextPage: false,
//     hasPrevPage: false,
//     nextPage: 0,
//     prevPage: null,
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const { user } = useUser();

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       search: "",
//       filter: "Todos",
//     },
//   });

//   const fetchEmployees = async (values: z.infer<typeof FormSchema>) => {
//     try {
//       setIsLoading(true);
//       if (!user?._id) {
//         throw new Error("User ID is required");
//       }

//       const {
//         success,
//         pagination: paginationData,
//         employees,
//       } = await GetEmployees(
//         user._id,
//         values.search,
//         values.filter,
//         pagination.page.toString(),
//       );

//       if (success) {
//         setEmployees(employees);
//         setPagination(paginationData);
//       }
//     } catch (error) {
//       console.error("Erro ao buscar funcionários:", error);
//       toast.error("Não foi possível carregar os funcionários.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const debouncedFetchEmployees = useCallback(
//     debounce((values: z.infer<typeof FormSchema>) => {
//       fetchEmployees(values);
//     }, 500),
//     [user?._id],
//   );

//   useEffect(() => {
//     const subscription = form.watch((values) => {
//       debouncedFetchEmployees(values as z.infer<typeof FormSchema>);
//     });

//     return () => {
//       subscription.unsubscribe();
//       debouncedFetchEmployees.cancel();
//     };
//   }, [form, debouncedFetchEmployees]);

//   useEffect(() => {
//     fetchEmployees(form.getValues());
//   }, []);

//   const handlePageChange = async (newPage: number) => {
//     try {
//       setIsLoading(true);
//       if (!user?._id) {
//         throw new Error("User ID is required");
//       }

//       const {
//         success,
//         pagination: paginationData,
//         employees,
//       } = await GetEmployees(
//         user._id,
//         form.getValues("search"),
//         form.getValues("filter"),
//         newPage.toString(),
//       );

//       if (success) {
//         setEmployees(employees);
//         setPagination(paginationData);
//       }
//     } catch (error) {
//       console.error("Erro ao mudar de página:", error);
//       toast.error("Não foi possível carregar a página.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Form {...form}>
//         <form
//           className="flex items-center justify-between"
//           onSubmit={form.handleSubmit(fetchEmployees)}
//         >
//           <FormField
//             control={form.control}
//             name="filter"
//             render={({ field }) => (
//               <FormItem className="flex items-center gap-4">
//                 <FormLabel>Filtrar por funcionários:</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Todos" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     <SelectItem value="Todos">Todos</SelectItem>
//                     <SelectItem value="Ativos">Ativos</SelectItem>
//                     <SelectItem value="Inativos">Inativos</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="search"
//             render={({ field }) => (
//               <FormItem className="flex items-center gap-4">
//                 <FormLabel>Buscar:</FormLabel>
//                 <FormControl>
//                   <Input placeholder="buscar funcionário" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </form>
//       </Form>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Nome</TableHead>
//               <TableHead>Empresa</TableHead>
//               <TableHead>Departamento</TableHead>
//               <TableHead>Status</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {isLoading ? (
//               <TableRow>
//                 <TableCell colSpan={4} className="h-24 text-center">
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="border-primary h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
//                     Carregando...
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ) : employees.length === 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={4}
//                   className="text-muted-foreground h-24 text-center"
//                 >
//                   Nenhum funcionário encontrado.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               employees.map((employee) => (
//                 <TableRow key={employee._id}>
//                   <TableCell>{employee.name}</TableCell>
//                   <TableCell>{employee.company}</TableCell>
//                   <TableCell>{employee.department}</TableCell>
//                   <TableCell className="flex items-center justify-between">
//                     {employee.status}
//                     <div className="flex justify-end gap-2">
//                       <Button variant="ghost" size="icon" className="size-8">
//                         <Link href={`funcionarios/${employee._id}`}>
//                           <Pencil className="size-4" />
//                         </Link>
//                       </Button>
//                       <Button variant="ghost" size="icon" className="size-8">
//                         <Trash className="size-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-between py-4">
//         <p className="text-muted-foreground text-sm">
//           {employees.length > 0 ? (
//             <>
//               Mostrando{" "}
//               {pagination.page === 1 ? 1 : (pagination.page - 1) * 10 + 1}
//               {" a "}
//               {pagination.page * 10 > pagination.total
//                 ? pagination.total
//                 : pagination.page * 10}
//               {" de "}
//               {pagination.total}
//               {" resultados"}
//             </>
//           ) : (
//             "Nenhum resultado encontrado"
//           )}
//         </p>

//         {pagination.totalPages > 1 && (
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   onClick={() => {
//                     if (pagination.hasPrevPage && pagination.prevPage) {
//                       handlePageChange(pagination.prevPage);
//                     }
//                   }}
//                   className={
//                     !pagination.hasPrevPage
//                       ? "pointer-events-none opacity-50"
//                       : "cursor-pointer"
//                   }
//                 >
//                   Anterior
//                 </PaginationPrevious>
//               </PaginationItem>

//               {Array.from({ length: pagination.totalPages }).map((_, index) => {
//                 const pageNumber = index + 1;
//                 const shouldShowPage =
//                   pageNumber === 1 ||
//                   pageNumber === pagination.totalPages ||
//                   Math.abs(pageNumber - pagination.page) <= 1;

//                 if (!shouldShowPage) {
//                   if (
//                     pageNumber === 2 ||
//                     pageNumber === pagination.totalPages - 1
//                   ) {
//                     return (
//                       <PaginationItem key={pageNumber}>
//                         <span className="px-2">...</span>
//                       </PaginationItem>
//                     );
//                   }
//                   return null;
//                 }

//                 return (
//                   <PaginationItem key={pageNumber}>
//                     <PaginationLink
//                       onClick={() => handlePageChange(pageNumber)}
//                       isActive={pagination.page === pageNumber}
//                       className="cursor-pointer"
//                     >
//                       {pageNumber}
//                     </PaginationLink>
//                   </PaginationItem>
//                 );
//               })}

//               <PaginationItem>
//                 <PaginationNext
//                   onClick={() => {
//                     if (pagination.hasNextPage && pagination.nextPage) {
//                       handlePageChange(pagination.nextPage);
//                     }
//                   }}
//                   className={
//                     !pagination.hasNextPage
//                       ? "pointer-events-none opacity-50"
//                       : "cursor-pointer"
//                   }
//                 >
//                   Próximo
//                 </PaginationNext>
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         )}
//       </div>
//     </>
//   );
// }
