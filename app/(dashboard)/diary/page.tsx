import MealCard from "@/components/MealCard"
import NewMealCard from "@/components/NewMealCard"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getMeals = async () => {
    const user = await getUserByClerkId()
    const meals = await prisma.meal.findMany({
        where: {
            userId: user.id
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
                {meals.map(meal => <MealCard key={meal.id} meal={meal} />)}
            </div>
        </div>
    )
}

export default DiaryPage