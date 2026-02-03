import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/features/products/ProductDetailPage";
import { getProductPageData } from "@/lib/product-page";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ id?: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { locale: localeParam } = await params;
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

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
