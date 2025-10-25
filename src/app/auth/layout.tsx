import Link from "next/link"
import { Bot } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Auth Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Hubility Agents</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Auth Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          {children}
        </div>
      </main>

      {/* Auth Footer */}
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <Link 
            href="/" 
            className="hover:text-foreground transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </footer>
    </div>
  )
}