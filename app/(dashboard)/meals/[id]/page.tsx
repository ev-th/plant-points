import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getMeal = async (id) => {
  const user = await getUserByClerkId()
  const meal = await prisma.meal.findUnique({
    where: {
      userId: user.id,
      id
    }
  })
  return meal
}

const MealPage = async ({ params }) => {
  const meal = await getMeal(params.id)
  return (
    <div>
      <div>{params.id}</div>
      <div>{meal.id}</div>
    </div>
  )
}

export default MealPage