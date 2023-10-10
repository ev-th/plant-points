import PointsCard from "@/components/PointsCard"
import DayOfMealsCard from "@/components/DayOfMealsCard"
import { MealWithIngredients } from "@/utils/types"
import { getMeals } from "@/utils/getMeals"
import { getDateFromSixDaysAgo } from "@/utils/getDateFromSixDaysAgo"

const DiaryPage = async () => {
  
  const sortMealsByDay = (meals: MealWithIngredients[]) => {
    const mealsByDay: Record<string, MealWithIngredients[]> = {}
    
    meals.forEach(meal => {
      const date = meal.eatenAt.toDateString()
      if (!mealsByDay[date]) {
        mealsByDay[date] = [meal]
      } else {
        mealsByDay[date].push(meal)
      }
    })
    
    const dates = Object.keys(mealsByDay).map(dateString => new Date(dateString))
    const sortedDates = dates.sort((a, b) => b.valueOf() - a.valueOf())
    const sortedDateStrings = sortedDates.map(day => day.toDateString())
    
    return sortedDateStrings.map(day => mealsByDay[day])
  }
  
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