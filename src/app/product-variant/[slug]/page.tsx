import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }
  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
    limit: 6,
  });
  
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            <Image
              src={productVariant.imageUrl}
              alt={productVariant.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          
          {/* Product Info */}
          <div className="flex flex-col space-y-6">
            {/* Variant Selector */}
            <div>
              <VariantSelector
                selectedVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
              />
            </div>
            
            {/* Product Title and Price */}
            <div className="space-y-2">
              <h1 className="text-2xl lg:text-3xl font-bold">
                {productVariant.product.name}
              </h1>
              <p className="text-muted-foreground">
                {productVariant.name}
              </p>
              <p className="text-2xl font-bold text-primary">
                {formatCentsToBRL(productVariant.priceInCents)}
              </p>
            </div>
            
            {/* Actions */}
            <ProductActions productVariantId={productVariant.id} />
            
            {/* Description */}
            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-3">Descrição</h3>
              <p className="text-muted-foreground leading-relaxed">
                {productVariant.product.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {likelyProducts.length > 0 && (
          <section className="mt-12">
            <ProductList title="Você também pode gostar" products={likelyProducts} />
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ProductVariantPage;

