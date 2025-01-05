import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="text-center mb-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Khuj The Search</h1>
        <p className="text-xl text-gray-300">Your AI-powered conversation assistant</p>
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>Choose an option to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/login">Login to Your Account</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/register">Create New Account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

