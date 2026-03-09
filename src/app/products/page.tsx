import { desc } from "drizzle-orm";
import Link from "next/link";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

// ─── Page Header ──────────────────────────────────────────────────────────────
const PageHeader = ({ total }: { total: number }) => (
  <div className="relative py-16 sm:py-20 overflow-hidden">
    <div className="absolute inset-0 bg-linear-to-b from-muted/40 to-transparent pointer-events-none" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

    <div className="relative container mx-auto px-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/"
          className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground/60 uppercase hover:text-muted-foreground transition-colors duration-200"
        >
          Início
        </Link>
        <span className="text-muted-foreground/30">/</span>
        <span className="text-[11px] font-semibold tracking-[0.2em] text-foreground uppercase">
          Produtos
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-black tracking-[0.35em] text-primary/70 uppercase">
            Coleção Completa
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-none">
            TODOS OS
            <br />
            <span className="text-muted-foreground/40">PRODUTOS</span>
          </h1>
        </div>

        <p className="text-[13px] text-muted-foreground sm:text-right">
          <span className="font-black text-foreground">{total}</span> produtos
        </p>
      </div>
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const ProductsPage = async () => {
  const products = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: { variants: true },
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">

        <PageHeader total={products.length} />

        <div className="pb-24">
          <div className="container mx-auto px-4">
            <div className="h-px bg-border/60 mb-10" />
          </div>

          <ProductList title="Todos os Produtos" products={products} />

          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <span className="text-5xl">🛍️</span>
              <p className="text-muted-foreground text-sm">
                Nenhum produto encontrado.
              </p>
            </div>
          )}
        </div>

      </main>
      <Footer />
    </>
  );
};

export default ProductsPage;