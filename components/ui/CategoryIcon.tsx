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

  return (
    <div
      className={`${params.category === category.slug ? 'bg-gray-300' : ''} flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b transition-colors duration-300`}
    >
        <div>
            <Image
                src={`/icon_${category.slug}.svg`}
                alt={`Imagen de la categoria ${category.name}`}
                width={50}
                height={50}
            />
        </div>
        <Link href={`/order/${category.slug}`} className="text-lg font-medium text-gray-900">{category.name}</Link>
    </div>
  );
}
