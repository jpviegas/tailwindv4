import { api } from "@/api/fake";
import { ModeToggle } from "@/components/themeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

export default async function HeaderComponent() {
  const data = await api.getCompanyInfo();
  return (
    <header className="bg-background shadow-sidebar-border sticky top-0 z-10 flex h-16 items-center justify-between px-8 shadow-lg">
      <Link href={"/dashboard"} className="size-12">
        <Image src={logo} alt="icon logo" />
      </Link>

      <div className="flex items-center gap-8">
        <SidebarTrigger className="border-input bg-background hover:bg-accent hover:text-accent-foreground size-9 border shadow-sm" />

        <ModeToggle />

        <h1>{data.name}</h1>
      </div>
    </header>
  );
}
