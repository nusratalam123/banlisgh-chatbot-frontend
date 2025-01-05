'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Image, Globe, FileDown, Send } from 'lucide-react'
import { jsPDF } from 'jspdf'

export function ChatInterface() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input])
      setInput('')
    }
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    
    messages.forEach((message, index) => {
      doc.text(message, 20, 20 + (index * 10))
    })
    
    doc.save('chat-export.pdf')
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4">
        <h1 className="text-4xl font-bold text-center mb-8">What can I help with?</h1>
        {messages.map((message, i) => (
          <div key={i} className="mb-4 p-4 rounded bg-muted/10">
            {message}
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <div className="max-w-[800px] mx-auto">
          <div className="relative">
            <Textarea
              placeholder="Message ChatGPT"
              className="min-h-[60px] resize-none pr-20"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Mic className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSend}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 justify-center">
            <Button variant="outline" className="gap-2">
              <Image className="h-4 w-4" />
              Create image
            </Button>
            <Button variant="outline" className="gap-2">
              <Globe className="h-4 w-4" />
              Analyze images
            </Button>
            <Button variant="outline" onClick={exportToPDF} className="gap-2">
              <FileDown className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

