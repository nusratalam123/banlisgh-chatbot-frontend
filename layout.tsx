import { Sidebar } from "./sidebar"
import { ChatInterface } from "./chat-interface"

export default function Layout() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <ChatInterface />
      </main>
    </div>
  )
}

