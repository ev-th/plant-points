import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  const user = await getUserByClerkId()
  const { name, ingredientIds, date } = await request.json()

  const meal = await prisma.meal.create({
    data: {
      userId: user.id,
      name,
      eatenAt: date,
      ingredients: {
        connect: ingredientIds.map((id: String) => ({id: id}))
      }
    }
  })

  return NextResponse.json({ data: meal })
}