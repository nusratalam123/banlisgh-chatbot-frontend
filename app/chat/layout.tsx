import { Sidebar } from "./components/sidebar"

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  )
}

