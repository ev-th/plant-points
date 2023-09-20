import MealCard from "@/components/MealCard"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"
import PointsCard from "@/components/PointsCard"

const getMeals = async () => {
  const user = await getUserByClerkId()
  const meals = await prisma.meal.findMany({
    where: {
      userId: user.id
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
  const meals = await getMeals()
  
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