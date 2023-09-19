'use client'

import { updateMeal } from "@/utils/api"
import { useState } from "react"

const MealEditor = ({ meal }) => {
  const [name, setName] = useState(meal.name)
  const [isLoading, setIsLoading] = useState(false)

  const saveMeal = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    await updateMeal(meal.id, name)
    setIsLoading(false)
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      
      <form onSubmit={saveMeal}>
        <input
          className="w-full h-full p-5 text-xl"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default MealEditor