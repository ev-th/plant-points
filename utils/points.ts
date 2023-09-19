export const calculatePoints = (meals) => {
  let points = 0
  const checked = {}

  meals.forEach(meal => {
    meal.ingredients.forEach(ingredient => {
      if (!checked[ingredient.id]) {
        checked[ingredient.id] = true
        points += +ingredient.points
      }
    })
  })

  return points
}