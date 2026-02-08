import { useStore } from "@/src/store";
import { OrderItem } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

type ProductDetailsProps = {
  item: OrderItem;
};

const MAX_ITEMS = 10;
const MIN_ITEMS = 1;

export default function ProductDetails({ item }: ProductDetailsProps) {
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const removeOrderItem = useStore((state) => state.removeOrderItem);

  const disableDecreaseButton = useMemo(() => item.quantity === MIN_ITEMS, [item]);
  const disableIncreaseButton = useMemo(
    () => item.quantity >= MAX_ITEMS,
    [item]
  );
  return (
    <div className="py-4 border-b border-gray-100 last:border-b-0 animate-fadeInUp">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-base font-bold text-gray-800">{item.name}</p>
          <p className="text-sm font-medium text-gray-500">{formatCurrency(item.price)}</p>
        </div>
        <button 
            type="button" 
            onClick={() => removeOrderItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
        >
            <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-3 mt-2">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            disabled={disableDecreaseButton}
            className="w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white flex items-center justify-center transition-colors"
          >
            <MinusIcon className="h-3 w-3" />
          </button>

          <p className="text-sm font-bold text-gray-900 w-4 text-center">{item.quantity}</p>

          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            disabled={disableIncreaseButton}
            className="w-6 h-6 rounded-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white flex items-center justify-center transition-colors"
          >
            <PlusIcon className="h-3 w-3" />
          </button>
      </div>
    </div>
  );
}
