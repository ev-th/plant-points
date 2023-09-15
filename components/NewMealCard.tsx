'use client'

import { createNewMeal, createNewRecipe } from "@/utils/api"
import { useRouter } from "next/navigation"

const NewMealCard = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const recipe = await createNewRecipe()
    const meal = await createNewMeal(recipe.id)
    router.push(`/diary/${meal.id}`)
  }

  return (
    <div className="rounded-lg bg-green-500 p-5" onClick={handleOnClick}>
      <h4>New Meal</h4>
    </div>
  )
}

export default NewMealCard