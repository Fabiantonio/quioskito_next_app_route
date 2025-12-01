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
      className="bg-white border border-gray-100 shadow-sm rounded-lg p-4 sm:p-6 space-y-4 hover:shadow-md transition-shadow duration-300"
    >
      <p className="text-2xl font-bold text-gray-900">
        Cliente: {order.name}{" "}
      </p>
      <p className="text-lg font-medium text-gray-700">Productos Ordenados: </p>
      <dl className="mt-6 space-y-4">
        {order.orderProducts.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt className="text-base font-medium text-gray-900">
              {item.product.name}
            </dt>
            <dd className="text-base font-medium text-gray-900">
              x{item.quantity}
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            Total a Pagar:
          </dt>
          <dd className="text-base font-bold text-gray-900">
            {formatCurrency(order.total)}
          </dd>
        </div>
      </dl>

      <form action={completeOrder}>
        <input
          type="hidden"
          name="order_id"
          value={order.id}
        />
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-lg transition-colors shadow-sm"
          value="Marcar Orden Completada"
        />
      </form>
    </section>
  );
}
