import { getUserByClerkId } from "@/utils/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/utils/db"

export const PATCH = async (request, { params }) => {
  const { name } = await request.json()

  const user = await getUserByClerkId()

  const updatedRecipe = await prisma.recipe.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id
      }
    },
    data: {
      name
    }
  })

  return NextResponse.json({ data: updatedRecipe })
}