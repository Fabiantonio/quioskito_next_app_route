import { prisma } from "@/src/lib/prisma";
import ImageUpload from "./ImageUpload";
import { Product } from "@prisma/client";

async function getCategories() {
  return await prisma.category.findMany();
}

type ProductFormProps = {
  product?: Product;
};

export default async function ProductForm({ product }: ProductFormProps) {
  const categories = await getCategories();
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          placeholder="Nombre del Producto"
          defaultValue={product?.name}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          name="price"
          className="block w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          placeholder="Precio del Producto"
          defaultValue={product?.price?.toString()}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700" htmlFor="categoryId">
          Categoría:
        </label>
        <select
          className="block w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <ImageUpload image={product?.image} />
    </>
  );
}
