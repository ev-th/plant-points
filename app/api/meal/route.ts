import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextRequest, NextResponse } from "next/server"
import { Prisma } from "@prisma/client"

export const POST = async (request: NextRequest ) => {
  const user = await getUserByClerkId()

  if(!user) {
    return NextResponse.json({ error: 'Auth Error' }, { status: 401 })
  }

  try {
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
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.message)
      
      return NextResponse.json({ error: 'Database Error' }, { status: 500 })
    }
  }

}