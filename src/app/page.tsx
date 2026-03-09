import { desc } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import PartnerBrands from "@/components/common/partner-brands";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const HeroBanner = () => (
  <div className="relative overflow-hidden rounded-2xl group">
    <Image
      src="/banner-hero.png"
      alt="Coleção 2026"
      width={1920}
      height={760}
      sizes="(max-width: 768px) 100vw, 1200px"
      className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      quality={100}
      unoptimized
      priority
    />

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

    {/* Bottom content */}
    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

        {/* Label */}
        <div className="flex flex-col gap-4">
          <span
            className="text-[11px] font-black tracking-[0.35em] text-white/50 uppercase"
            style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
          >
             Coleção 2026
          </span>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="group/btn inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 text-[13px] font-bold tracking-wide text-zinc-950 transition-all duration-300 hover:bg-zinc-100 hover:gap-3.5 hover:shadow-xl hover:shadow-black/30"
          >
            Ver Coleção
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  </div>

);


// ─── Secondary Banner ─────────────────────────────────────────────────────────
const SecondaryBanner = () => (
  <div className="relative overflow-hidden rounded-2xl group">
    <Image
      src="/banner-secondary.png"
      alt="Nova Chegada"
      width={1920}
      height={760}
      sizes="(max-width: 768px) 100vw, 1200px"
      className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      quality={100}
      unoptimized
      priority
    />

    <div className="absolute inset-0 bg-linear-to-l from-black/75 via-black/20 to-transparent" />
    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

    <div className="absolute inset-0 flex flex-col items-end justify-end p-6 sm:justify-center sm:p-10 md:p-14">
      <div className="flex flex-col gap-4 sm:gap-6 max-w-65 sm:max-w-sm text-right">

        <div className="flex flex-col gap-2">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.05] tracking-tight"
            style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
          >
            SEJA
            <br />
            <span className="text-white/40 font-light italic tracking-normal"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              autêntico.
            </span>
          </h2>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Link
            href="/products"
            className="group/btn inline-flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 text-[12px] font-bold tracking-wide text-zinc-950 transition-all duration-300 hover:bg-zinc-100 hover:gap-3.5"
            style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
          >
            Descobrir
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  </div>
);

// ─── Divider ──────────────────────────────────────────────────────────────────
const SectionDivider = () => (
  <div className="container mx-auto px-4">
    <div className="h-px bg-border/50" />
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: { variants: true },
    limit: 12,
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: { variants: true },
    limit: 12,
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">

        {/* ── Hero ── */}
        <section className="w-full pt-4 sm:pt-6">
          <div className="container mx-auto px-4">
            <HeroBanner />
          </div>
        </section>
          <PartnerBrands /> 

        {/* ── Mais Vendidos ── */}
        <section className="py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <ProductList products={products} title="Mais Vendidos" />
          </div>
        </section>

        <SectionDivider />

        {/* ── Categorias ── */}
        <section className="py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <CategorySelector categories={categories} />
          </div>
        </section>

        <SectionDivider />

        {/* ── Secondary Banner ── */}
        <section className="py-14 sm:py-20">
          <div className="container mx-auto px-4">
            <SecondaryBanner />
          </div>
        </section>

        <SectionDivider />

        {/* ── Novos Produtos ── */}
        <section className="py-14 pb-24 sm:py-20 sm:pb-32">
          <div className="container mx-auto px-4">
            <ProductList products={newlyCreatedProducts} title="Novos Produtos" />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};

export default Home;