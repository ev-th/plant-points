import { getUserByClerkId } from "@/utils/auth"
import { NextRequest, NextResponse } from "next/server"
import  Meal from "@/models/Meal"

export const POST = async (request: NextRequest) => {
  const user = await getUserByClerkId()

  if(!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 })
  }

  try {

    const meal = Meal.fromRequest(user.id, await request.json())

    if (!meal) {
      return NextResponse.json({ status: 400 })
    }

    const created_meal = await meal.createOnDatabase()

    return NextResponse.json({ data: created_meal })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}