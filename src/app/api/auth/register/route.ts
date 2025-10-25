import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { hashPassword } from "@/lib/auth"
import { registerSchema } from "@/lib/validations"

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = registerSchema.parse(body)
    const { email, password } = validatedData

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Ya existe un usuario con este email" },
        { status: 400 }
      )
    }

    // Create user
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    })

    return NextResponse.json(
      { 
        message: "Usuario creado exitosamente",
        user 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Register error:", error)
    
    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { error: "Datos de registro inválidos" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}