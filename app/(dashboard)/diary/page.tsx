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
    const entries = await getMeals()
    return (
        <div>Diary</div>
    )
}

export default DiaryPage