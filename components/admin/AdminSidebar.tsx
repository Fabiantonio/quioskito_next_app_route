import Logo from "../ui/Logo";
import { AdminRoute } from "./AdminRoute";

const adminNavigation = [
  { url: "/admin/orders", text: "Ordenes", blank: false },
  { url: "/admin/products", text: "Productos", blank: false },
  { url: "/order/cafe", text: "Ver Quiosco", blank: true },
];

export default function AdminSidebar() {
  return (
    <div className="bg-white h-full flex flex-col border-r border-gray-100 shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <Logo />
      </div>
      <div className="flex-1 py-6 px-4 space-y-6">
        <div>
            <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Navegación
            </p>
            <nav className="flex flex-col gap-1">
            {adminNavigation.map(link => (
                <AdminRoute key={link.url} link={link}/>
            ))}
            </nav>
        </div>
      </div>
    </div>
  );
}
