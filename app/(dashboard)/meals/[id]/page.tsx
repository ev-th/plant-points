import MealForm from "@/components/MealForm"
import { getIngredients, getMealWithIngredients } from "@/utils/dbQueries" 

const MealPage = async ({ params }: {params: {id: string}}) => {
  const meal = await getMealWithIngredients(params.id)
  const ingredientOptions = await getIngredients()

  return (
    <div className="rounded border bg-slate-50 shadow-lg mx-4 my-4 sm:max-w-xl sm:mx-auto">
      <h1 className='text-3xl m-8 text-center font-bold'>Edit your meal</h1>
      <div className="m-4">
        <MealForm meal={meal} ingredientOptions={ingredientOptions}  />
      </div>
    </div>
  )
}

export default MealPage