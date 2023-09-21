import { getUserByClerkId } from "@/utils/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/utils/db"

export const PATCH = async (request, { params }) => {
  const { name, ingredientIds, date } = await request.json()

  const user = await getUserByClerkId()

  const updatedRecipe = await prisma.meal.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id
      }
    },
    data: {
      name,
      eatenAt: date,
      ingredients: {
        set: ingredientIds.map(id => ({id: id}))
      }
    }
  })

  return NextResponse.json({ data: updatedRecipe })
}

export const DELETE = async (request, { params }) => {
  const user = await getUserByClerkId()
  
  const deletedRecipe = await prisma.meal.delete({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id
      }
    }
  })

  return NextResponse.json({ data: deletedRecipe })
}