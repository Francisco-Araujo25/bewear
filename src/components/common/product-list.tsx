"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback,useEffect, useRef, useState } from "react";

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("a")?.offsetWidth ?? 280;
    const gap = 16;
    const scrollAmount = (cardWidth + gap) * 2;
    el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between px-5">
        <h3 className="font-semibold text-lg">{title}</h3>

        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver todos
          </Link>

          {/* Desktop nav arrows */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-8 w-8 rounded-full border border-border flex items-center justify-center transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-8 w-8 rounded-full border border-border flex items-center justify-center transition-all hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Próximo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel — mobile + desktop */}
      <div
        ref={scrollRef}
        className="flex w-full gap-4 overflow-x-auto px-5 pb-2 [&::-webkit-scrollbar]:hidden scroll-smooth"
      >
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            textContainerClassName="px-0"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;