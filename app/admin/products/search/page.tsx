import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(SearchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: SearchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = searchParams.search;
  const products = await searchProducts(search);
  return (
    <>
      <Heading>Resultado de la búsqueda: {searchParams.search}</Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <ProductSearchForm />
      </div>
      {products.length === 0 && (
        <p className="text-center text-gray-500">
          No se encontraron productos con ese nombre.
        </p>
      )}
      <ProductTable products={products} />
    </>
  );
}
