import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({ selectedVariantSlug, variants }: VariantSelectorProps) => {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <span className="text-sm font-medium">Cores disponíveis</span>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <Link
            href={`/product-variant/${variant.slug}`}
            key={variant.id}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl transition-all hover:ring-2 hover:ring-primary ${
              selectedVariantSlug === variant.slug
                ? "ring-2 ring-primary ring-offset-2"
                : "opacity-80"
            }`}
          >
            <Image
              src={variant.imageUrl}
              alt={variant.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;

