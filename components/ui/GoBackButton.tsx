"use client"
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="px-4 py-2 rounded-md text-white text-center bg-black hover:bg-gray-800 transition-colors shadow-sm"
    >
      Volver
    </button>
  );
}
