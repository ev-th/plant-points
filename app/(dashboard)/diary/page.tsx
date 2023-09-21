import MealCard from "@/components/MealCard"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"
import PointsCard from "@/components/PointsCard"

const getMeals = async (dateFrom, dateTo) => {
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
    orderBy: {
      createdAt: 'desc',
    },
  })

  return meals
}

const DiaryPage = async () => {
  let oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 6)
  oneWeekAgo.setHours(0, 0, 0, 0)
  const meals = await getMeals(oneWeekAgo, new Date())
  
  return (
    <div className="p-5">
      
      <h2 className="text-3xl mb-8">Your Meal Diary</h2>
      <PointsCard meals={meals}/>
      <div>
        {meals.map(meal => 
          <Link key={meal.id} href={`/meals/${meal.id}`}>
            <MealCard meal={meal} />
          </Link>
        )}
      </div>
    </div>
  )
}

export default DiaryPage