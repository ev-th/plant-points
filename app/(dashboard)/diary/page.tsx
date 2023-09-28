import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import PointsCard from "@/components/PointsCard"
import DayOfMealsCard from "@/components/DayOfMealsCard"

const getMeals = async (dateFrom, dateTo) => {
  console.log("GET MEALS FUNCTION CALL")
  const user = await getUserByClerkId()
  const meals = await prisma.meal.findMany({
    where: {
      userId: user.id,
      eatenAt: {
        lte: dateTo,
        gte: dateFrom
      }
    },
    include: {
      ingredients: true
    },
  })

  return meals
}

const DiaryPage = async () => {
  let oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6)
  oneWeekAgo.setHours(0, 0, 0, 0)
  console.log('DiaryPage');
  const meals = await getMeals(oneWeekAgo, new Date())

  const sortMealsByDay = (meals) => {
    const mealsByDay = {}
    meals.forEach(meal => {
      const date = meal.eatenAt.toDateString()
      if (!mealsByDay[date]) {
        mealsByDay[date] = [meal]
      } else {
        mealsByDay[date].push(meal)
      }
    })

    const dates = Object.keys(mealsByDay).map(dateString => new Date(dateString))
    const sortedDates = dates.sort((a, b) => b - a)
    const sortedDateStrings = sortedDates.map(day => day.toDateString())
    
    return sortedDateStrings.map(day => mealsByDay[day])
  }

  const sortedMeals = sortMealsByDay(meals)
  
  return (
    <div className="p-5">
      
      <h2 className="text-3xl mb-8">Your Meal Diary</h2>
      <PointsCard meals={meals}/>
      {sortedMeals.map(dayOfMeals => <DayOfMealsCard meals={dayOfMeals} />)}
    </div>
  )
}

export default DiaryPage