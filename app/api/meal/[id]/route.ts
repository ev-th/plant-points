import { getUserByClerkId } from "@/utils/auth"
import { NextResponse } from "next/server"
import { prisma } from "@/utils/db"
import { Prisma } from "@prisma/client"


export const PATCH = async (request: NextResponse, { params }: { params: {id: string } }) => {
  const user = await getUserByClerkId()

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 })
  }

  try {
    const { name, ingredientIds, date } = await request.json()

    const updatedMeal = await prisma.meal.update({
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
          set: ingredientIds.map((id: string) => ({id: id}))
        }
      }
    })

    return NextResponse.json({ data: updatedMeal })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Prisma error: ${error.message}`)

      return NextResponse.json({ error: `Database Error: ${error.message}` }, { status: 500 })
    } else {
      console.error(`Unexpected error: ${error}`)

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }
}

export const DELETE = async (request: NextResponse, { params }: { params: { id: string } }) => {
  const user = await getUserByClerkId()

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 })
  }
  
  try {
    const deletedRecipe = await prisma.meal.delete({
      where: {
        userId_id: {
          userId: user.id,
          id: params.id
        }
      }
    })
  
    return NextResponse.json({ data: deletedRecipe })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(`Prisma error: ${error.message}`)

      return NextResponse.json({ error: `Database Error: ${error.message}` }, { status: 500 })
    } else {
      console.error(`Unexpected error: ${error}`)

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  }
}