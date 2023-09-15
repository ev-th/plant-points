'use client'

import { createNewMeal } from "@/utils/api"
import { useRouter } from "next/navigation"

const NewMealCard = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const data = await createNewMeal()
    router.push(`/meal/${data.id}`)
  }

  return (
    <div className="rounded-lg bg-green-500 p-5" onClick={handleOnClick}>
      <h4>New Meal</h4>
    </div>
  )
}

export default NewMealCard