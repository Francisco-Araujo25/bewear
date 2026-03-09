"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
  desktopCatalog?: boolean;
}

// ─── Auth Gate Dialog ─────────────────────────────────────────────────────────
const AuthGateDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) => {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm rounded-2xl px-6 py-8 text-center">
        <DialogHeader className="items-center gap-2">
          <DialogTitle className="text-xl font-bold">
            Criar uma conta
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed text-center max-w-65 mx-auto">
            Conecte-se à BEWEAR e aproveite uma experiência feita pra quem se
            veste com personalidade.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <Button
            variant="outline"
            className="w-full gap-3 rounded-xl h-12 text-sm font-semibold border-border hover:bg-muted/60"
            onClick={handleGoogleSignIn}
          >
            {/* Google SVG icon */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4"/>
              <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
              <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
              <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
            </svg>
            Continue com o Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ─── Product Item ─────────────────────────────────────────────────────────────
const ProductItem = ({
  product,
  textContainerClassName,
  desktopCatalog,
}: ProductItemProps) => {
  const { data: session } = authClient.useSession();
  const [authOpen, setAuthOpen] = useState(false);

  const firstVariant = product.variants[0];
  if (!firstVariant) return null;

  const handleClick = (e: React.MouseEvent) => {
    if (!session?.user) {
      e.preventDefault();
      setAuthOpen(true);
    }
  };

  return (
    <>
      <Link
        href={`/product-variant/${firstVariant.slug}`}
        onClick={handleClick}
        className="group flex flex-col gap-3 w-37.5 shrink-0 md:w-64 lg:w-72"
      >
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
          <Image
            src={firstVariant.imageUrl}
            alt={firstVariant.name}
            fill
            sizes="(max-width: 768px) 150px, (max-width: 1024px) 256px, 288px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className={cn("flex flex-col gap-1", textContainerClassName)}>
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-muted-foreground truncate text-xs">{product.description}</p>
          <p className="text-sm font-semibold">{formatCentsToBRL(firstVariant.priceInCents)}</p>
        </div>
      </Link>
      <AuthGateDialog open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};

export default ProductItem;