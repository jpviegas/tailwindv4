"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "");
  const getSegmentPath = (index: number) => {
    return "/" + segments.slice(0, index + 1).join("/");
  };

  return (
    <nav className="bg-background border-foreground/10 border-b px-8 py-1">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {segments.map((segment, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbSeparator />
              {index === segments.length - 1 ? (
                <BreadcrumbPage>
                  <span className="capitalize">{segment}</span>
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={getSegmentPath(index)}>
                  <span className="capitalize">{segment}</span>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
