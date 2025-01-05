'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu, Plus, Grid, Clock, LogOut } from 'lucide-react'

export function Sidebar() {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  const handleShowPdf = () => {
    router.push('/showAllpdf')
  }

  return (
    <div className="w-[260px] border-r bg-muted/10">
      <div className="flex h-14 items-center border-b px-4">
        <Button variant="ghost" size="icon" className="mr-2">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex-1">Khoj The Search</div>
        <Button size="icon" variant="ghost">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-7rem)]">
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Grid className="mr-2 h-4 w-4" />
              Khoj Gpt
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleShowPdf}
            >
              <Grid className="mr-2 h-4 w-4" />
              Show PDF
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Grid className="mr-2 h-4 w-4" />
              Explore GPTs
            </Button>
          </div>
          <div className="space-y-1">
            <h4 className="px-2 text-sm font-semibold">Today</h4>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Previous 7 Days
            </Button>
          </div>
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

