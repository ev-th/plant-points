import PointsCard from "@/components/PointsCard"
import DayOfMealsCard from "@/components/DayOfMealsCard"
import { getMeals } from "@/utils/dbQueries"
import { getDateFromSixDaysAgo } from "@/utils/getDateFromSixDaysAgo"
import { sortMealsByDay } from "@/utils/sortMealsByDay"

const DiaryPage = async () => {
  const meals = await getMeals(getDateFromSixDaysAgo(new Date()), new Date())
  const sortedMeals = sortMealsByDay(meals)
  
  return (
    <div className="p-5">
      
      <h2 className="text-3xl mb-8">Your Meal Diary</h2>
      <PointsCard meals={meals}/>
      {sortedMeals.map(dayOfMeals => <DayOfMealsCard key={dayOfMeals[0].eatenAt.toDateString()} meals={dayOfMeals} />)}
    </div>
  )
}

export default DiaryPage