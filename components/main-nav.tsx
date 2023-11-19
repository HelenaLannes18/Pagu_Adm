"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  //@ts-ignore
  function generateRoute(path, label, params, pathname) {
    return {
      href: `/${params?.storeId}${path}`,
      label,
      active: pathname === `/${params?.storeId}${path}`,
    };
  }

  const routesConfig = [
    { path: "", label: "Dashboard" },
    { path: "/billboards", label: "Coleções" },
    { path: "/categories", label: "Categorias" },
    { path: "/sizes", label: "Tamanhos" },
    { path: "/colors", label: "Cores" },
    { path: "/products", label: "Produtos" },
    { path: "/promotions", label: "Promoções" },
    { path: "/tabelas", label: "Tabelas" },
    { path: "/orders", label: "Pedidos" },
    { path: "/cupoms", label: "Cupons" },
    { path: "/settings", label: "Configurações" },
  ];

  const routes = routesConfig.map((config) =>
    generateRoute(config.path, config.label, params, pathname)
  );

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          passHref
          legacyBehavior
        >
          <a
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-black dark:text-white" : "text-muted-foreground"
            )}
          >
            {route.label}
          </a>
        </Link>

      ))}
    </nav>
  )
};
