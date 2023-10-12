import Link from "next/link"

import MealCard from "@/components/MealCard"
import { MealWithIngredients } from "@/utils/types"

const DayOfMealsCard = ({meals}: {meals: MealWithIngredients[]}) => {
  const date = new Date(meals[0].eatenAt).toDateString()
  return (
    <div className="bg-pink-200 p-2 rounded-lg my-1">
      <p role="region">Eaten on {date}</p>
      <ul role="list" className="flex gap-2">
        {meals.map(meal => (
          <li key={meal.id}>
            <Link role="link" href={`/meals/${meal.id}`}>
              <MealCard meal={meal}/>
            </Link>
          </li>))}
      </ul>
    </div>
  )
}

export default DayOfMealsCard