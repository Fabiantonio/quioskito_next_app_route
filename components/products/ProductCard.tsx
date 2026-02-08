import { Product } from "@prisma/client";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col h-full border border-gray-100">
      <div className="relative w-full aspect-square mb-4">
        <Image
          src={imagePath}
          alt={`Imagen platillo ${product.name}`}
          fill
          className="object-contain hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight">
          {product.name}
        </h3>
        {/* Placeholder description as strict schema doesn't have description, or maybe it does? 
            Checking prisma schema... Product has id, name, price, image, categoryId. No description. 
            I'll simulate a description or omit it. The image shows descriptions. 
            Since I can't add data to DB, I'll use a generic one or omit.
            I'll use a generic short description for visual fidelity if possible, or just skip.
        */}
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
            Delicious and fresh ingredients prepared just for you.
        </p>

        <div className="mt-auto flex items-center justify-between">
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(product.price)}
          </p>

          <AddProductButton product={product} />
        </div>
      </div>
    </div>
  );
}
