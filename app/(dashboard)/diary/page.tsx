import PointsCard from "@/components/PointsCard"
import DayOfMealsCard from "@/components/DayOfMealsCard"
import { getMeals } from "@/utils/dbQueries"
import { getDateFromSixDaysAgo } from "@/utils/getDateFromSixDaysAgo"
import { sortMealsByDay } from "@/utils/sortMealsByDay"

const DiaryPage = async () => {
  const meals = await getMeals(getDateFromSixDaysAgo(new Date()), new Date())
  const sortedMeals = sortMealsByDay(meals)
  
  return (
    <div>
      <h2 className="text-4xl m-8 font-bold text-center">Food Diary</h2>
      <div className="px-4">
        <PointsCard meals={meals}/>
      </div>
      {sortedMeals.map(dayOfMeals => <DayOfMealsCard key={dayOfMeals[0].eatenAt.toDateString()} meals={dayOfMeals} />)}
    </div>
  )
}

export default DiaryPage