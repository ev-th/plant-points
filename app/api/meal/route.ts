import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (request) => {
  const user = await getUserByClerkId()
  const { recipeId } = await request.json()
  console.log(`recipeId - ${recipeId}`)

  const meal = await prisma.meal.create({
    data: {
      userId: user.id,
      recipeId: recipeId
    }
  })

  return NextResponse.json({ data: meal })
}