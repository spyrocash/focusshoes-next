import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { ProductDetailPage } from "@/features/products/ProductDetailPage";

type Params = {
  id: string;
};

type PageProps = {
  params: Promise<Params>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(decodeURIComponent(id));

  if (!product) {
    notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
    "https://focusshoes.vercel.app";
  const productUrl = `${siteUrl}/products/${encodeURIComponent(product.id)}`;
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
        name: "หน้าแรก",
        item: siteUrl,
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
