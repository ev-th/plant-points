import RecipeEditor from "@/components/RecipeEditor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db" 

const getRecipe = async (id) => {
  const user = await getUserByClerkId()
  const recipe = await prisma.recipe.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id
      }
    }
  })

  return recipe
}

const RecipePage = async ({ params }) => {
  const recipe = await getRecipe(params.id)

  return (
    <div>
      <RecipeEditor recipe={recipe}/>
    </div>
  )
}

export default RecipePage