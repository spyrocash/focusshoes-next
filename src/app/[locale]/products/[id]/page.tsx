import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/features/products/ProductDetailPage";
import { getProductPageData } from "@/lib/product-page";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id, locale: localeParam } = await params;
  alert(`id: ${id}`);
  alert(`localeParam: ${localeParam}`);
  const { product, productJsonLd, breadcrumbJsonLd } = getProductPageData(
    localeParam,
    id,
  );

  if (!product) {
    notFound();
  }

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
