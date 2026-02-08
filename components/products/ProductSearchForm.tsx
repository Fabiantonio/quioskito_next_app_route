"use client";

import { SearchSchema } from "@/src/schema";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default function ProductSearchForm() {
  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };
    const result = SearchSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    redirect(`/admin/products/search?search=${result.data.search}`);
  };
  return (
    <form action={handleSearchForm} className="flex items-center gap-2">
      <input
        type="text"
        name="search"
        placeholder="Buscar producto..."
        className="px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm w-full sm:w-64 transition-all"
      />
      <button
        type="submit"
        className="px-4 py-2.5 rounded-xl text-white bg-gray-900 hover:bg-gray-800 transition-colors shadow-sm text-sm font-medium"
      >
        Buscar
      </button>
    </form>
  );
}
