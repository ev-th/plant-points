import Link from "next/link"

import MealCard from "@/components/MealCard"
import { MealWithIngredients } from "@/utils/types"

const DayOfMealsCard = ({meals}: {meals: MealWithIngredients[]}) => {
  const date = new Date(meals[0].eatenAt).toDateString()
  return (
    <div>
      <div className='h-0.5 bg-slate-200'></div>
      <div className="bg-slate-100 p-4 max-w-7xl mx-auto">
        <p role="region">{date}</p>
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