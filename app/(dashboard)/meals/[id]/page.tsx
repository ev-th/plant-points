import MealForm from "@/components/MealForm"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { MealWithIngredients } from "@/utils/types"

const getMeal = async (id: string): Promise<MealWithIngredients> => {
  const user = await getUserByClerkId()

  if (!user) {
    throw new Error("Authentication failed.")
  }

  return prisma.meal.findUniqueOrThrow({
    where: {
      userId: user.id,
      id
    },
    include: {
      ingredients: true
    }
  })
}

const getIngredients = async () => {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  return ingredients
}

const MealPage = async ({ params }: {params: {id: string}}) => {
  const meal = await getMeal(params.id)
  const ingredientOptions = await getIngredients()

  return (
    <div>
      <MealForm meal={meal} ingredientOptions={ingredientOptions}  />
    </div>
  )
}

export default MealPage