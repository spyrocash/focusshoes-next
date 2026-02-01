import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { ProductDetailPage } from "@/features/products/ProductDetailPage";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/i18n/locales";
import { messages } from "@/i18n/messages";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id, locale: localeParam } = await params;
  const locale = SUPPORTED_LOCALES.includes(localeParam as Locale)
    ? (localeParam as Locale)
    : DEFAULT_LOCALE;
  const product = getProductById(decodeURIComponent(id));

  if (!product) {
    notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
    "https://focusshoes.vercel.app";
  const productUrl = `${siteUrl}/${locale}/products/${encodeURIComponent(product.id)}`;
  const homeUrl = `${siteUrl}/${locale}`;
  const images = product.images.map((image) =>
    image.startsWith("http") ? image : `${siteUrl}${image}`,
  );

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: images,
    description: product.description,
    sku: product.id,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Focus Shoes",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "THB",
      price: Number(product.price),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: messages[locale].notFoundCta,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailPage product={product} />
    </>
  );
}
