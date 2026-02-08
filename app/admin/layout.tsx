import ToastNotification from "@/components/ui/ToastNotification";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="md:flex h-screen bg-gray-50 overflow-hidden">
        <aside className="md:w-72 md:h-screen shrink-0 z-10">
          <AdminSidebar />
        </aside>

        <main className="flex-1 md:h-screen md:overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>

      <ToastNotification />
    </>
  );
}
