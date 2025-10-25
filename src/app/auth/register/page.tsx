"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { registerSchema, type RegisterFormData } from "@/lib/validations"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true)
    
    try {
      // Create user account
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Register error:", errorData.error)
        // TODO: Show error toast/message to user
        return
      }

      // Automatically sign in the user after successful registration
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.ok) {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error("Register error:", error)
      // TODO: Show error toast/message to user
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
        <CardDescription>
          Completa los datos para crear tu cuenta y comenzar a gestionar tus agentes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Requirements */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>La contraseña debe contener:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Al menos 6 caracteres</li>
                <li>Una letra mayúscula</li>
                <li>Una letra minúscula</li>
                <li>Un número</li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-accent-primary hover:bg-accent-primary-hover text-white font-semibold" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </Button>
          </form>
        </Form>

        {/* Link to Login */}
        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">¿Ya tienes una cuenta? </span>
          <Link 
            href="/auth/login" 
            className="text-primary underline-offset-4 hover:underline font-medium"
          >
            Inicia sesión aquí
          </Link>
        </div>

        {/* Terms and Privacy */}
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Al crear una cuenta, aceptas nuestros{" "}
          <Link href="/terminos" className="underline hover:text-foreground">
            Términos de Servicio
          </Link>
          {" "}y{" "}
          <Link href="/privacidad" className="underline hover:text-foreground">
            Política de Privacidad
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}