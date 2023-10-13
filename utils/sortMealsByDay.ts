import { MealWithIngredients } from "@/utils/types"

export const sortMealsByDay = (meals: MealWithIngredients[]) => {
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