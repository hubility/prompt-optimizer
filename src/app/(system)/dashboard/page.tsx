import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Plus, Activity, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { LogoutButton } from "@/components/logout-button"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
   
      </header>

      {/* Main Content */}
      <main className="container py-8">


        {/* Stats Cards */}


        {/* Empty State */}


        {/* Quick Actions */}

      </main>
    </div>
  )
}