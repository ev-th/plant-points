import MealForm from '@/components/MealForm'
import { prisma } from '@/utils/db'
import React from 'react'

const getIngredients = async () => {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: {
      name: 'asc'
    }
  })
  console.log("ingredients", ingredients)
  return ingredients
}

const NewMealPage = async () => {
  const ingredients = await getIngredients()
  return (
    <div>
      <MealForm ingredientOptions={ingredients}/>
    </div>
  )
}

export default NewMealPage