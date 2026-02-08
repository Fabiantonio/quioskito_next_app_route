"use client"
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { OrderWithProducts } from "@/src/types";
import  useSWR  from "swr";


export default function OrderPage() {

  const url = '/admin/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;
  if (error) return <p>Error: {error.message}</p>;

  if (data) return (
    <>
      <Heading>Administración de Ordenes</Heading>

      {data.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-10">
          {data.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
            <p className="text-lg text-gray-500">No hay ordenes pendientes</p>
            <p className="text-sm text-gray-400 mt-2">Las nuevas ordenes aparecerán aquí</p>
        </div>
      )}
    </>
  );
}
