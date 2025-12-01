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
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        value={"Buscar"}
        className="px-4 py-2 rounded-md text-white bg-black hover:bg-gray-800 transition-colors shadow-sm"
      >
        Buscar
      </button>
    </form>
  );
}
