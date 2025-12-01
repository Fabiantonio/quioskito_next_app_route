import { Product } from "@/src/generated/prisma/client";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4">
      <div className="relative w-full aspect-square">
        <Image
          src={imagePath}
          alt={`Imagen platillo ${product.name}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="mt-4 space-y-2">
        <h3
          className="text-lg font-medium text-gray-800 truncate"
          title={product.name}
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-bold text-black">
            {formatCurrency(product.price)}
          </p>

          <AddProductButton product={product} />
        </div>
      </div>
    </div>
  );
}
