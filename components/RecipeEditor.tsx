'use client'

import { updateRecipe } from "@/utils/api"
import { useState } from "react"

const RecipeEditor = ({ recipe }) => {
  const [name, setName] = useState(recipe.name)
  const [isLoading, setIsLoading] = useState(false)

  const saveRecipe = async () => {
    setIsLoading(true)
    await updateRecipe(recipe.id, name)
    setIsLoading(false)
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <input
        className="w-full h-full p-5 text-xl"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={saveRecipe}>Save</button>
    </div>
  )
}

export default RecipeEditor