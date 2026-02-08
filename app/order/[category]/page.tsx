import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
  return products;
}

async function getCategory(slug: string) {
    return await prisma.category.findFirst({
        where: { slug }
    })
}

export default async function OrderPage({
  params,
}: {
  params: { category: string };
}) {
  const productsPromise = getProducts(params.category);
  const categoryPromise = getCategory(params.category);

  const [products, category] = await Promise.all([productsPromise, categoryPromise]);

  return (
    <>
      <Heading>{category?.name || "Menu"}</Heading>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 items-start animate-fadeInUp duration-300">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
