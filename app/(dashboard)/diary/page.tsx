import MealCard from "@/components/MealCard"
import NewMealCard from "@/components/NewMealCard"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link"

const getMeals = async () => {
    const user = await getUserByClerkId()
    const meals = await prisma.meal.findMany({
        where: {
            userId: user.id
        },
        include: {
            recipe: true
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
            <h2 className="text-3xl mb-8">Meal Diary</h2>
            <div className="grid grid-cols-3 gap-4">
                <NewMealCard />
                {meals.map(meal => 
                    <Link key={meal.id} href={`/diary/${meal.id}`}>
                        <MealCard meal={meal} />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default DiaryPage