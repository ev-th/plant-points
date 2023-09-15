const createURL = (path: String) => {
  return window.location.origin + path
}

export const createNewRecipe = async () => {
  const res = await fetch(
    new Request(createURL('/api/recipe'), {
      method: 'POST'
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const createNewMeal = async (recipeId: String) => {
  const res = await fetch(
    new Request(createURL('/api/meal'), {
      method: 'POST',
      body: JSON.stringify({
        recipeId: recipeId
      })
    })
  )
  
  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}