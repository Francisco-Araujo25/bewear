"use client";

import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

export const Cart = () => {
  const { data: cart } = useCart();

  const itemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
  const hasItems = (cart?.items.length ?? 0) > 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBasketIcon className="h-4 w-4" />
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-black text-primary-foreground leading-none">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Carrinho
            {itemCount > 0 && (
              <span className="text-xs font-semibold text-muted-foreground">
                ({itemCount} {itemCount === 1 ? "item" : "itens"})
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            {!hasItems ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center py-12">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-muted">
                  <ShoppingBasketIcon className="h-6 w-6 text-muted-foreground/50" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold">Carrinho vazio</p>
                  <p className="text-xs text-muted-foreground">
                    Adicione produtos para continuar.
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">Ver produtos</Link>
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-full">
                <div className="flex h-full flex-col gap-6 py-2">
                  {cart?.items.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      productVariantId={item.productVariant.id}
                      productName={item.productVariant.product.name}
                      productVariantName={item.productVariant.name}
                      productVariantImageUrl={item.productVariant.imageUrl}
                      productVariantPriceInCents={item.productVariant.priceInCents}
                      quantity={item.quantity}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          {hasItems && (
            <div className="flex flex-col gap-4">
              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p className="text-muted-foreground">Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs font-medium">
                <p className="text-muted-foreground">Entrega</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  GRÁTIS
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between font-semibold">
                <p className="text-sm">Total</p>
                <p className="text-sm">
                  {formatCentsToBRL(cart?.totalPriceInCents ?? 0)}
                </p>
              </div>

              <Button className="mt-2 rounded-full" size="lg" asChild>
                <Link href="/cart/identification">Finalizar compra</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};