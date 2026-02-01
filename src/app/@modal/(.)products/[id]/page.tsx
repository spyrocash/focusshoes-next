import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { ProductDetailModalRoute } from "@/features/products/ProductDetailModalRoute";

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

  return <ProductDetailModalRoute product={product} />;
}
