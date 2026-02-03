import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "@/i18n/locales";
import { messages } from "@/i18n/messages";
import { getProductById } from "@/lib/products";

export function resolveLocale(localeParam: string): Locale {
  return SUPPORTED_LOCALES.includes(localeParam as Locale)
    ? (localeParam as Locale)
    : DEFAULT_LOCALE;
}

export function getProductPageData(localeParam: string, rawId: string) {
  const locale = resolveLocale(localeParam);
  const product = getProductById(decodeURIComponent(rawId));

  if (!product) {
    return { locale, product: null };
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

  return {
    locale,
    product,
    productJsonLd,
    breadcrumbJsonLd,
  };
}
