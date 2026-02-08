"use client"

import { Product } from "@prisma/client";
import { useStore } from "@/src/store";

type AddProductButtonProps = {
  product: Product;
}

export default function AddProductButton({ product }: AddProductButtonProps) {

    const addToOrder = useStore((state) => state.addToOrder);
    const increaseQuantity = useStore((state) => state.increaseQuantity);
    const decreaseQuantity = useStore((state) => state.decreaseQuantity);
    const removeOrderItem = useStore((state) => state.removeOrderItem);
    const order = useStore((state) => state.order);

    const item = order.find((item) => item.id === product.id);

    if (!item) {
        return (
            <button
                type="button"
                onClick={() => addToOrder(product)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md transition-colors w-full md:w-auto"
            >
                Agregar
            </button>
        )
    }

    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={() => {
                    if (item.quantity > 1) {
                        decreaseQuantity(item.id)
                    } else {
                        removeOrderItem(item.id)
                    }
                }}
                className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center font-bold shadow-sm transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
            </button>

            <span className="text-lg font-bold text-gray-900 w-4 text-center">{item.quantity}</span>

            <button
                type="button"
                onClick={() => increaseQuantity(item.id)}
                className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center font-bold shadow-sm transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
        </div>
    );
}
