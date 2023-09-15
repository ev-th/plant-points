import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async () => {
  const user = await getUserByClerkId()

  const recipe = await prisma.recipe.create({
    data: {
      userId: user.id,
      name: 'New Recipe'
    }
  })

  return NextResponse.json({ data: recipe })
}