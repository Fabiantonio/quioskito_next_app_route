"use client"
import { Category } from "@/src/generated/prisma/browser";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

type CategoryIconProps = {
  category: Category;
};


export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{ category: string }>();
  const isActive = params.category === category.slug;

  return (
    <div
      className={`${isActive ? 'bg-orange-50 border-l-4 border-orange-500' : 'border-transparent'} flex items-center gap-4 w-full p-3 transition-colors duration-300 hover:bg-orange-50 cursor-pointer`}
    >
        <div className="w-8 h-8 relative">
            <Image
                src={`/icon_${category.slug}.svg`}
                alt={`Imagen de la categoria ${category.name}`}
                fill
                className="object-contain"
            />
        </div>
        <Link 
            href={`/order/${category.slug}`} 
            className={`text-lg font-medium ${isActive ? 'text-black' : 'text-gray-500'}`}
        >
            {category.name}
        </Link>
    </div>
  );
}
