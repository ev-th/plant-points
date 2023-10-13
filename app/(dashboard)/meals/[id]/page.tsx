import MealForm from "@/components/MealForm"
import { getIngredients, getMealWithIngredients } from "@/utils/dbQueries" 

const MealPage = async ({ params }: {params: {id: string}}) => {
  const meal = await getMealWithIngredients(params.id)
  const ingredientOptions = await getIngredients()

  return (
    <div>
      <MealForm meal={meal} ingredientOptions={ingredientOptions}  />
    </div>
  )
}

export default MealPage