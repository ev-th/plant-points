import { calculatePoints, getUniqueIngredients } from '@/utils/points'
import { MealWithIngredients } from '@/utils/types'

const PointsCard = async ({meals}: {meals: MealWithIngredients[]}) => {
  const ingredients = getUniqueIngredients(meals)
  const points = calculatePoints(meals)
  return (
    <div className='bg-gray-300 rounded-lg p-2'>
      <p>Your plant points over the last 7 days: {points}</p>
      <p className='font-semibold'>Ingredients you&#39;ve eaten this week:</p>
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredient.id}>- {ingredient.name}, points: {ingredient.points.toString()}</li>)
        )}
      </ul>
    </div>
  )
}

export default PointsCard