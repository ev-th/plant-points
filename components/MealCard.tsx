const MealCard = ({ meal }) => {
  const date = new Date(meal.eatenAt).toDateString()
  const points = meal.ingredients.reduce((sum, ingredient) => sum + +ingredient.points, 0)

    return (
      <div className="bg-green-300 rounded-lg p-2 my-1">
        <h4 className="text-xl font-semibold">{meal.name}</h4>
        <p>Eaten on {date}</p>
        <p>Points: {points}</p>
        <ul>
          {meal.ingredients.map(ingredient => (
            <li key={`${meal.id}_${ingredient.id}`}>- {ingredient.name}</li>)
          )}
        </ul>
      </div>
    )
  }
  
  export default MealCard