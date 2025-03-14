import { z } from "zod";

export const ufsBrasil = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export type LoginType = z.infer<typeof loginSchema>;
export const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type CompanyType = z.infer<typeof registerCompanySchema>;
export type CompanyTypeWithId = CompanyType & { _id: string };
export const registerCompanySchema = z.object({
  companyName: z.string().min(10, "O nome é obrigarório"),
  nickname: z.string().min(1, "O nome fantasia é obrigatório"),
  cnpj: z
    .string()
    .nonempty()
    .length(14, "Preencha apenas os 14 números do CNPJ"),
  cep: z.string().length(7, "O número do CEP é obrigatório"),
  address: z.string().min(1, "O endereço é obrigatório"),
  district: z.string().min(1, "O bairro é obrigatório"),
  city: z.string().min(1, "A cidade é obrigatória"),
  uf: z.string().min(1, "A UF é obrigatória"),
  page: z.string().min(1, "O número da folha obrigatório"),
  registration: z.string().min(1, "A inscrição estadual é obrigatória"),
  responsibleCpf: z
    .string()
    .length(11, "O número de CPF do responsável é obrigatório"),
  responsibleName: z.string().min(1, "O nome do responsável é obrigatório"),
  responsibleRole: z.string().min(1, "O cargo do responsável é obrigatória"),
  companyEmail: z.string().email("O email da empresa é obrigatório"),
});

export type EmployeeType = z.infer<typeof registerEmployeeSchema>;
export type EmployeeTypeWithId = EmployeeType & { _id: string };
export const registerEmployeeSchema = z.object({
  name: z.string().min(10, "O nome é obrigarório"),
  pis: z.string().min(1, "O PIS é obrigatório"),
  cpf: z
    .string()
    .nonempty("O CPF é obrigatório")
    .length(11, "Preencha apenas os 11 números do CPF"),
  registration: z.string().min(1, "O número de matrícula é obrigatório"),
  admissionDate: z.date({
    required_error: "A data de admissão é obrigatória",
  }),
  company: z.string().min(1, "O código da empresa é obrigatório"),
  workingHours: z.string(),
  status: z.enum(["active", "inactive"]),
  department: z.string(),
  costCenter: z.string(),
  position: z.string(),
  sheetNumber: z.string(),
  ctps: z.string(),
  directSuperior: z.string().optional(),
  rg: z
    .string()
    .nonempty("O RG é obrigatório")
    .length(9, "Preencha apenas os 9 números do RG"),
  birthDate: z.date({
    required_error: "A data de nascimento é obrigatória",
  }),
  socialName: z.string().optional(),
  cnh: z.string().optional(),
  cnhCategory: z.string().optional(),
  cnhExpiration: z.date({
    required_error: "A data de expiração da CNH é obrigatória",
  }),
  cep: z.string().optional(),
  address: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  phone: z.string().optional(),
  extension: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  placeOfBirth: z.string().optional(),
  civilStatus: z.string().optional(),
});

export type DepartmentType = z.infer<typeof registerDepartmentSchema>;
export type DepartmentTypeWithId = DepartmentType & { _id: string };
export const registerDepartmentSchema = z.object({
  department: z.string().min(1, "O nome é obrigarório"),
  company: z.string().min(1, "A empresa é obrigarória"),
  approvalFlow: z.string(),
  sheetNumber: z.string().min(1, "O número da folha é obrigarório"),
});

export type RoleType = z.infer<typeof registerRoleSchema>;
export type RoleTypeWithId = RoleType & { _id: string };
export const registerRoleSchema = z.object({
  role: z.string().min(1, "O nome é obrigarório"),
  company: z.string().min(1, "O ID da empresa é obrigarório"),
});

export type WorkingHourType = z.infer<typeof registerWorkingHourSchema>;
export type WorkingHourTypeWithId = WorkingHourType & { _id: string };
export const registerWorkingHourSchema = z.object({
  hour: z.string().min(1, "O nome é obrigarório"),
  company: z.string().min(1, "O ID da empresa é obrigatório"),
});
