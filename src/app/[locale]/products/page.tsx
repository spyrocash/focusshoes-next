import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/features/products/ProductDetailPage";
import { getProductPageData } from "@/lib/product-page";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ id?: string | string[]; "liff.state"?: string | string[] }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { locale: localeParam } = await params;
  const idParam = (await searchParams)?.id;
  const liffStateParam = (await searchParams)?.["liff.state"];
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const resolvedId = id ?? resolveLiffStateId(liffStateParam);

  if (!resolvedId) {
    notFound();
  }

  const { product, productJsonLd, breadcrumbJsonLd } = getProductPageData(localeParam, resolvedId);

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

function resolveLiffStateId(liffState: string | string[] | undefined) {
  if (!liffState) return null;
  const value = Array.isArray(liffState) ? liffState[0] : liffState;
  const state = value.startsWith("?") ? value : `?${value}`;
  const params = new URLSearchParams(state);
  return params.get("id");
}
