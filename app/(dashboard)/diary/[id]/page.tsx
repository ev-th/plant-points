import MealEditor from "@/components/MealEditor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db" 

const getMeal = async (id) => {
  const user = await getUserByClerkId()
  const meal = await prisma.meal.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id
      }
    }
  })

  return meal
}

const MealPage = async ({ params }) => {
  const meal = await getMeal(params.id)

  return (
    <div>
      <MealEditor meal={meal}/>
    </div>
  )
}

export default MealPage