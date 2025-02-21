import HeaderComponent from "@/components/header";
import NavLinks from "@/components/navlinks";
import SidebarComponent from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Dashboard - Amplo Serviços",
  description: "Deashboard amplo serviços",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex h-dvh w-dvw">
        <SidebarComponent />
        <div className="flex flex-auto flex-col">
          <div className="sticky top-0 z-10">
            <HeaderComponent />
            <NavLinks />
          </div>
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Toaster />
        </div>
      </div>
    </SidebarProvider>
  );
}
