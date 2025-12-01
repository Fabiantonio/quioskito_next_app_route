"use client"
import React, { useMemo } from "react";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);
  const total = useMemo(() => order.reduce((acc, item) => acc + (item.quantity * item.price), 0), [order]);
  
  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }
    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })
    }

    toast.success("Pedido confirmado")
    clearOrder()
  }

  return (
    <aside className="md:w-64 md:h-screen md:overflow-y-scroll lg:w-96 p-5 bg-[#f5f5f5]">
      <h1 className="text-4xl text-center font-bold text-gray-800">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos en el pedido</p>
      ) : (
        <div>
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <div className="flex justify-between items-center mt-4 animate-fadeInUp duration-300">
            <p className="text-2xl font-bold text-gray-800">Total a pagar:</p>
            <p className="text-2xl font-bold text-gray-800">
              {formatCurrency(total)}
            </p>
          </div>
          <form className="w-full mt-10 space-y-5" action={handleCreateOrder}>
            <input type="text" placeholder="Ingrese su nombre" className="w-full p-2 border border-gray-300 rounded" name="name" />
            <input type="submit" className="py-2 rounded uppercase text-white bg-black hover:bg-zinc-700 transition-all duration-300 w-full text-center cursor-pointer " value="Confirmar Pedido" />
          </form>
        </div>
      )}
    </aside>
  );
}
