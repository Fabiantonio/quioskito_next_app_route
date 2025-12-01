import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/generated/prisma/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() {
  return await prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize,
    skip: skip,
    include: {
      category: true,
    },
  });
  return products;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = Number(searchParams.page || 1);
  const pageSize = 10;

  if (page <= 0) {
    redirect(`/admin/products`);
  }

  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();

  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) {
    redirect(`/admin/products`);
  }

  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href="/admin/products/new"
          className="px-4 py-2 rounded-md text-white text-center bg-black hover:bg-gray-800 transition-colors shadow-sm"
        >
          Crear Producto
        </Link>
        <ProductSearchForm />
      </div>
      <ProductTable products={products} />
      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  );
}
