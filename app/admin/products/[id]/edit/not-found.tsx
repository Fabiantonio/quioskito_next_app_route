import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Heading>Producto no encontrado</Heading>
      <Link className="mt-4 text-white bg-black hover:bg-gray-800 transition-colors px-4 py-2 rounded cursor-pointer" href="/admin/products">Volver a productos</Link>
    </div>
  );
}
