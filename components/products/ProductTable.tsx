import { Category, Product } from "@prisma/client";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

type ProductTableProps = {
  products: ({
    category: Category;
  } & Product)[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="mt-8 flow-root">
        <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100 bg-white">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50/50">
              <tr>
                <th scope="col" className="py-4 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 sm:pl-6">
                  Producto
                </th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Precio
                </th>
                <th scope="col" className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Categoría
                </th>
                <th scope="col" className="relative py-4 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600 font-medium">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
                        {product.category.name}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-gray-400 hover:text-orange-600 transition-colors inline-block"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                      <span className="sr-only">Editar, {product.name}</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}
