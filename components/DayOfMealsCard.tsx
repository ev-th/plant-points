import Link from "next/link"

import MealCard from "./MealCard"

const DayOfMealsCard = ({meals}) => {
  const date = new Date(meals[0].eatenAt).toDateString()
  return (
    <div className="bg-pink-200 p-2 rounded-lg my-1">
      <p>Eaten on {date}</p>
      <div className="flex gap-2">
        {meals.map(meal => (
          <Link key={meal.id} href={`/meals/${meal.id}`}>
            <MealCard key={meal.id} meal={meal}/>
          </Link>))}
      </div>
    </div>
  )
}

export default DayOfMealsCard