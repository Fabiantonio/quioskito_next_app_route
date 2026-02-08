"use client";

import { createProductAction } from "@/actions/create-product-action";
import { ProductSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };
    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await createProductAction(result.data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    toast.success("Producto creado con éxito");
    router.push("/admin/products");
  };
  return (
    <div className="bg-white px-8 py-10 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <form action={handleSubmit} className="space-y-6">
        {children}
        <input
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 transition-colors text-white font-bold py-3.5 rounded-xl cursor-pointer shadow-sm hover:shadow"
          value="Crear Producto"
        />
      </form>
    </div>
  );
}
