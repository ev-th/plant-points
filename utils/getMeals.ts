import { getUserByClerkId } from "@/utils/auth"
import { MealWithIngredients } from "./types"
import { prisma } from "@/utils/db"

export const getMeals = async (dateFrom: Date, dateTo: Date): Promise<MealWithIngredients[]> => { 
  const user = await getUserByClerkId()

  return prisma.meal.findMany({
    where: {
      userId: user.id,
      eatenAt: {
        lte: dateTo,
        gte: dateFrom
      }
    },
    include: {
      ingredients: true
    },
  })
}