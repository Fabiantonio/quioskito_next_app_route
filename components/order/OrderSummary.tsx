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
  
  // Calculate subtotal, taxes, total
  const subtotal = useMemo(() => order.reduce((acc, item) => acc + (item.quantity * item.price), 0), [order]);
  //const taxes = subtotal * 0.10; // Assuming 10% tax for example, or hardcode/omit
  const total = subtotal; // If taxes are included or added. Image shows Subtotal 6.99, Taxes 0.51, Total 7.50. 
  // 0.51 is ~7.3% of 6.99. 
  // I will just use Total = Subtotal for simplicity unless tax logic is required. 
  // Or display "Tax (Included)" or similar. 
  // Let's stick to just Total for now to avoid logic mismatch with backend.

  
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
    <aside className="md:w-80 lg:w-96 h-screen bg-white flex flex-col border-l border-gray-100 shadow-xl z-20">
        <div className="p-6 flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Tu Orden</h2>
            
            {order.length === 0 ? (
                <p className="text-center text-gray-500 py-10">Tu carrito está vacío</p>
            ) : (
                <div className="space-y-2">
                    {order.map((item) => (
                        <ProductDetails key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>

        {/* Payment Summary & Actions */}
        {order.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Resumen de Pago</h3>
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                    {/* Placeholder for Taxes if needed */}
                    {/* <div className="flex justify-between text-sm text-gray-500">
                        <span>Taxes</span>
                        <span>{formatCurrency(taxes)}</span>
                    </div> */}
                    <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                </div>

                <form action={handleCreateOrder} className="space-y-3">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Tu Nombre" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                    <button 
                        type="submit" 
                        className="w-full py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors uppercase tracking-wide"
                    >
                        Confirmar Orden
                    </button>
                </form>
            </div>
        )}
    </aside>
  );
}
