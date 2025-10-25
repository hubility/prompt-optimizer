"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc, getTRPCClient } from '@/lib/trpc'
import { Toaster } from "@/components/ui/toaster"
import { useState } from 'react'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: { staleTime: 5000 },
    },
  }));
  const [trpcClient] = useState(() => getTRPCClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LanguageProvider>
              {children}
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
