import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/features/products/ProductDetailPage";
import { getProductPageData } from "@/lib/product-page";

type PageProps = {
  params: { locale: string };
  searchParams?: { id?: string | string[] };
};

export default async function Page({ params, searchParams }: PageProps) {
  const { locale: localeParam } = params;
  const idParam = searchParams?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

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
