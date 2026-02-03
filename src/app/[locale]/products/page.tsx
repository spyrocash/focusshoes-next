// import { notFound } from "next/navigation";
import liff from "@line/liff";
import { ProductDetailPage } from "@/features/products/ProductDetailPage";
import { getProductPageData } from "@/lib/product-page";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ id?: string | string[] }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { locale: localeParam } = await params;
  const idParam = (await searchParams)?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;

  if (!id) {
    await liff.sendMessages([
      { type: "text", text: JSON.stringify({ params, searchParams, localeParam, id }, null, 2) },
    ]);

    return (
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify({ params, searchParams, localeParam, id }, null, 2)}
      </pre>
    );

    // notFound();
  }

  const { product, productJsonLd, breadcrumbJsonLd } = getProductPageData(localeParam, id);

  if (!product) {
    await liff.sendMessages([
      {
        type: "text",
        text: JSON.stringify({ params, searchParams, localeParam, id, product }, null, 2),
      },
    ]);

    return (
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify({ params, searchParams, localeParam, id, product }, null, 2)}
      </pre>
    );

    // notFound();
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
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify({ params, searchParams }, null, 2)}
      </pre>
      <ProductDetailPage product={product} />
    </>
  );
}
