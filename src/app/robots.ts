import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bewear.com.br";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart/", "/checkout/", "/my-orders/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

