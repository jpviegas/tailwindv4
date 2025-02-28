import { Card, CardContent } from "@/components/ui/card";
import NewRolesForm from "./rolesForm";

export default async function Roles() {
  return (
    <main className="container mx-auto h-full">
      <div className="flex items-center justify-between">
        <h1 className="mt-8 text-3xl font-bold">Novo Cargo</h1>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr,300px]">
        <Card>
          <CardContent className="p-6">
            <NewRolesForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
