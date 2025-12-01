"use client"

import { Product } from "@prisma/client";
import { useStore } from "@/src/store";

type AddProductButtonProps = {
  product: Product;
}

export default function AddProductButton({ product }: AddProductButtonProps) {

    const addToOrder = useStore((state) => state.addToOrder);

  return (
    <button
      type="button"
      onClick={() => addToOrder(product)}
      className="bg-black hover:bg-gray-800 text-white p-2 rounded-full shadow-sm transition-colors"
      aria-label="Agregar al pedido"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
}
