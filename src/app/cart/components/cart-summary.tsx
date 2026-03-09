import { Package, ShoppingBag,Truck } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";

interface CartSummaryProps {
  subtotalInCents: number;
  totalInCents: number;
  products: Array<{
    id: string;
    name: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }>;
}

const CartSummary = ({
  subtotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) => {
  const totalItems = products.reduce((acc, p) => acc + p.quantity, 0);
  const savings = subtotalInCents - totalInCents;

  return (
    <div className="rounded-2xl border border-border bg-card text-card-foreground overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-primary" />
          <h2 className="text-base font-semibold tracking-tight">
            Resumo do Pedido
          </h2>
        </div>
        <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
          {totalItems} {totalItems === 1 ? "item" : "itens"}
        </span>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* Product List */}
        <div className="space-y-3 max-h-64 overflow-y-auto -mr-1 pr-1"
          style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent" }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-3 group">
              {/* Image */}
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.quantity > 1 && (
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {product.quantity}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col min-w-0 gap-0.5">
                <p className="truncate text-sm font-medium leading-snug">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {product.variantName}
                </p>
              </div>

              {/* Price */}
              <div className="flex flex-col items-end shrink-0">
                <span className="text-sm font-semibold tabular-nums">
                  {formatCentsToBRL(product.priceInCents * product.quantity)}
                </span>
                {product.quantity > 1 && (
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                    {formatCentsToBRL(product.priceInCents)} / un
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Totals */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="text-sm tabular-nums">
              {formatCentsToBRL(subtotalInCents)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Truck className="h-3.5 w-3.5" />
              <span>Frete</span>
            </div>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              GRÁTIS
            </span>
          </div>

          {savings > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Desconto</span>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 tabular-nums">
                − {formatCentsToBRL(savings)}
              </span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="rounded-xl bg-primary px-4 py-3.5 flex items-center justify-between">
          <span className="text-sm font-medium text-primary-foreground/80">
            Total
          </span>
          <span className="text-2xl font-bold text-primary-foreground tabular-nums">
            {formatCentsToBRL(totalInCents)}
          </span>
        </div>

        {/* Free shipping badge */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Package className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span>Entrega gratuita para todo o Brasil</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;