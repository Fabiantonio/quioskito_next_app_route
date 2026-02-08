import { completeOrder } from "@/actions/complete-order-action";
import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";

type OrderCardProps = {
  order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-6 hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="flex flex-col gap-1 border-b border-gray-100 pb-4">
        <p className="text-2xl font-bold text-gray-900">
          {order.name}
        </p>
        <span className="text-sm text-gray-500">Cliente</span>
      </div>
      
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Productos</p>
        <ul className="space-y-3">
            {order.orderProducts.map((item) => (
            <li
                key={item.product.id}
                className="flex items-center justify-between text-sm"
            >
                <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center text-xs">
                        {item.quantity}
                    </span>
                    <span className="text-gray-700 font-medium">
                        {item.product.name}
                    </span>
                </div>
            </li>
            ))}
        </ul>
      </div>

      <div className="border-t border-gray-100 pt-4 mt-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-base font-medium text-gray-600">
            Total a Pagar:
          </span>
          <span className="text-xl font-bold text-gray-900">
            {formatCurrency(order.total)}
          </span>
        </div>

        <form action={completeOrder}>
            <input
            type="hidden"
            name="order_id"
            value={order.id}
            />
            <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-xl uppercase font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all duration-200"
            >
            Completar Orden
            </button>
        </form>
      </div>
    </section>
  );
}
