import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();
  return (
    <aside className="md:w-72 md:h-screen bg-white flex flex-col">
      <Logo />
      <nav className="mt-10 flex-1">
        <h2 className="text-xl font-bold text-gray-800 px-5 mb-4">Menu</h2>
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
}
