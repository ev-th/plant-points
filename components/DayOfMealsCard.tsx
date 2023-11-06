import Link from "next/link"

import MealCard from "@/components/MealCard"
import { MealWithIngredients } from "@/utils/types"
import { formatDate } from "@/utils/formatDate"

const DayOfMealsCard = ({meals}: {meals: MealWithIngredients[]}) => {
  const date = formatDate(new Date(meals[0].eatenAt))
  return (
    <div>
      <div className="bg-slate-100 max-w-7xl mx-auto">
        <p role="region" className="bg-[var(--green)] text-[var(--ivory)] w-20 rounded p-2 mb-2 text-center">{date}</p>
        <ul role="list" className="flex flex-wrap flex-row">
          {meals.map(meal => (
            <li key={meal.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 p-1">
              <Link role="link" href={`/meals/${meal.id}`}>
                <MealCard meal={meal}/>
              </Link>
            </li>))}
        </ul>
      </div>

    </div>
  )
}

export default DayOfMealsCard