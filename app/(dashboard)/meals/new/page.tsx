import MealForm from '@/components/MealForm'
import React from 'react'
import { getIngredients } from '@/utils/dbQueries'

const NewMealPage = async () => {
  const ingredients = await getIngredients()

  return (
    <div>
      <MealForm ingredientOptions={ingredients}/>
    </div>
  )
}

export default NewMealPage