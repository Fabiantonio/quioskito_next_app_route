import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="md:flex h-screen bg-gray-50 overflow-hidden">
        <OrderSidebar />
        
        <div className="flex-1 flex flex-col h-full min-w-0">
            {/* Top Nav */}
            <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 z-10">
                <div className="w-full flex justify-center relative">
                  <h1 className="text-xl font-bold text-gray-800">Elija su Orden</h1>
                  <p className="text-sm text-gray-400 absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">Siguiente: Confirme su Orden</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {/* Search Bar - Visual only for now */}
              {/* <div className="mb-6 relative max-w-lg mx-auto lg:mx-0">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <input 
                      type="text" 
                      placeholder="Implementar proximente" 
                      className="w-full pl-10 pr-4 py-3 bg-white border-none shadow-sm rounded-xl text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
                  />
              </div> */}
              
              {children}
            </main>
        </div>

        <OrderSummary />
      </div>
      <ToastNotification />
    </>
  );
}
