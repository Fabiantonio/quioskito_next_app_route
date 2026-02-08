import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export type ProductsPaginationProps = {
  page: number;
  totalPages: number;
};

export default function ProductsPagination({
  page,
  totalPages,
}: ProductsPaginationProps) {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-10">
      <div className="-mt-px flex w-0 flex-1">
        {isFirstPage ? (
            <span className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-300 cursor-not-allowed">
                <ChevronLeftIcon className="mr-3 h-5 w-5 text-gray-300" aria-hidden="true" />
                Anterior
            </span>
        ) : (
            <Link
                href={`/admin/products/?page=${page - 1}`}
                className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
            >
                <ChevronLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Anterior
            </Link>
        )}
      </div>

      <div className="hidden md:-mt-px md:flex">
        {pages.map((p) => {
            // Simple logic to not show too many pages if list is long could be added here
            // For now, keeping original logic but updated styles
             return (
                <Link
                key={p}
                href={`/admin/products/?page=${p}`}
                className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                    p === page 
                    ? "border-orange-500 text-orange-600" 
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                >
                {p}
                </Link>
            )
        })}
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        {isLastPage ? (
            <span className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-300 cursor-not-allowed">
                Siguiente
                <ChevronRightIcon className="ml-3 h-5 w-5 text-gray-300" aria-hidden="true" />
            </span>
        ) : (
            <Link
                href={`/admin/products/?page=${page + 1}`}
                className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors"
            >
                Siguiente
                <ChevronRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Link>
        )}
      </div>
    </nav>
  );
}
