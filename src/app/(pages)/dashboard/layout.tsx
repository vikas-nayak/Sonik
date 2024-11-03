import Topbar from "@/components/global/topbar"
import Sidebar from "@/components/global/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-fuchsia-300 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}