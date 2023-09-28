import MealEditor from "@/components/MealEditor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getMeal = async (id) => {
  const user = await getUserByClerkId()
  const meal = await prisma.meal.findUnique({
    where: {
      userId: user.id,
      id
    },
    include: {
      ingredients: true
    }
  })
  return meal
}

const getIngredients = async () => {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  return ingredients
}

const MealPage = async ({ params }) => {
  const meal = await getMeal(params.id)
  const ingredientOptions = await getIngredients()

  // Make the points value serialisable to pass to client component
  meal?.ingredients.forEach(ingredient => ingredient.points = ingredient.points.toString())
  ingredientOptions.forEach(ingredient => ingredient.points = ingredient.points.toString())

  return (
    <div>
      <MealEditor meal={meal} ingredientOptions={ingredientOptions} data-superjson />
    </div>
  )
}

export default MealPage