"use client";

import { HomeIcon, LogInIcon, LogOutIcon, MenuIcon, PackageIcon, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

const NAV_CATEGORIES = [
  { label: "Camisetas", href: "/category/camisetas" },
  { label: "Bermuda & Shorts", href: "/category/bermuda-shorts" },
  { label: "Calças", href: "/category/calcas" },
  { label: "Jaquetas & Moletons", href: "/category/jaquetas-moletons" },
  { label: "Tênis", href: "/category/tenis" },
  { label: "Acessórios", href: "/category/acessorios" },
];

export const Header = () => {
  const { data: session } = authClient.useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-background"
      }`}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-5 py-3 md:px-10">

        {/* Left: user */}
        <div className="flex items-center gap-2 w-40">
          {session?.user ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={session.user.image as string | undefined} />
                <AvatarFallback className="text-[10px] font-bold">
                  {session.user.name?.split(" ")?.[0]?.[0]}
                  {session.user.name?.split(" ")?.[1]?.[0]}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-muted-foreground hidden md:block truncate max-w-25">
                Olá, {session.user.name?.split(" ")?.[0]}!
              </span>
            </div>
          ) : (
            <span className="text-xs font-medium text-muted-foreground hidden md:block">
              Olá. Faça seu login!
            </span>
          )}
        </div>

        {/* Center: logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image src="/logo-bewear.svg" alt="BEWEAR" width={110} height={28} priority />
        </Link>

        {/* Right: actions */}
        <div className="flex items-center gap-2 w-40 justify-end">
          {/* Desktop logout */}
          {session?.user && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => authClient.signOut()}
              title="Sair"
            >
              <LogOutIcon className="h-4 w-4" />
            </Button>
          )}

          {/* Desktop login */}
          {!session?.user && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex h-8 w-8 text-muted-foreground hover:text-foreground"
              asChild
              title="Entrar"
            >
              <Link href="/authentication">
                <LogInIcon className="h-4 w-4" />
              </Link>
            </Button>
          )}

          <Cart />

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden h-9 w-9">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="px-5 flex flex-col gap-5">

                {/* User block */}
                {session?.user ? (
                  <div className="flex items-center justify-between rounded-xl border border-border p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={session.user.image as string | undefined} />
                        <AvatarFallback className="text-sm font-bold">
                          {session.user.name?.split(" ")?.[0]?.[0]}
                          {session.user.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold leading-tight">{session.user.name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-40">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => authClient.signOut()}
                    >
                      <LogOutIcon className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-xl border border-border p-3">
                    <p className="text-sm font-semibold">Olá. Faça seu login!</p>
                    <Button size="sm" className="gap-1.5 rounded-full" asChild>
                      <Link href="/authentication">
                        Login
                        <LogInIcon className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                )}

                {/* Quick links */}
                <div className="rounded-xl border border-border overflow-hidden">
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-150 border-b border-border"
                  >
                    <HomeIcon className="h-4 w-4 text-muted-foreground" />
                    Início
                  </Link>
                  <Link
                    href="/my-orders"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-150 border-b border-border"
                  >
                    <PackageIcon className="h-4 w-4 text-muted-foreground" />
                    Meus Pedidos
                  </Link>
                  <Link
                    href="/cart"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-150"
                  >
                    <ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />
                    Sacola
                  </Link>
                </div>

                {/* Categories */}
                <div className="rounded-xl border border-border overflow-hidden">
                  {NAV_CATEGORIES.map((cat, i) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors duration-150 ${
                        i < NAV_CATEGORIES.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* ── Category nav bar (desktop only) ── */}
      <nav className="hidden md:flex items-center justify-center gap-8 px-10 pb-3 border-t border-border/40">
        {NAV_CATEGORIES.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 pt-3"
          >
            {cat.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};