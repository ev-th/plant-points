export const calculatePoints = (meals) => {
  const ingredients = getUniqueIngredients(meals)
  return ingredients.reduce((sum, ingredient) => sum + +ingredient.points, 0)
}

export const getUniqueIngredients = (meals) => {
  const checked = {}
  const ingredients = []

  meals.forEach(meal => {
    meal.ingredients.forEach(ingredient => {
      if (!checked[ingredient.id]) {
        checked[ingredient.id] = true
        ingredients.push(ingredient)
      }
    })
  })

  return ingredients
}