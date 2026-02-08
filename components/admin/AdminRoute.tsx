"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
};

export const AdminRoute = ({ link }: AdminRouteProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(link.url);
  return (
    <Link
      href={link.url}
      className={`
        block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
        ${isActive 
            ? "bg-orange-50 text-orange-600 shadow-sm ring-1 ring-orange-200" 
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }
      `}
      target={link.blank ? "_blank" : ""}
    >
      {link.text}
    </Link>
  );
};
