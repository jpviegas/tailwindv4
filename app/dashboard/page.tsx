import QuickPanel from "@/components/dashboard/painelrapido";
import LastPoints from "@/components/dashboard/ultimospontos";

export default async function DashboardPage() {
  return (
    <main className="container mx-auto flex h-full flex-col items-center justify-evenly">
      <QuickPanel />
      <LastPoints />
    </main>
  );
}
