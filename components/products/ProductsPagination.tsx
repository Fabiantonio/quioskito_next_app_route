import Link from "next/link";

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
    <div className="flex items-center justify-evenly mt-6 position-static">
      {isFirstPage === true ? (
        <span className="px-4 py-2 rounded-md text-white bg-gray-300 cursor-not-allowed transition-colors shadow-sm">
          Anterior
        </span>
      ) : (
        <Link
          href={`/admin/products/?page=${page - 1}`}
          className="px-4 py-2 rounded-md text-white bg-black hover:bg-gray-800 transition-colors shadow-sm"
        >
          Anterior
        </Link>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={`/admin/products/?page=${p}`}
          className={`px-4 py-2 rounded-md text-white ${
            p === page ? "bg-black" : "bg-gray-300"
          } hover:bg-gray-800 transition-colors shadow-sm`}
        >
          {p}
        </Link>
      ))}

      {isLastPage === true ? (
        <span className="px-4 py-2 rounded-md text-white bg-gray-300 cursor-not-allowed transition-colors shadow-sm">
          Siguiente
        </span>
      ) : (
        <Link
          href={`/admin/products/?page=${page + 1}`}
          className="px-4 py-2 rounded-md text-white bg-black hover:bg-gray-800 transition-colors shadow-sm"
        >
          Siguiente
        </Link>
      )}
    </div>
  );
}
