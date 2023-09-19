const MealCard = ({ meal }) => {
  const date = new Date(meal.eatenAt).toDateString()

    return (
      <div>
        <h4 className="text-xl font-semibold">{meal.name}</h4>
        <div>Eaten on {date}</div>
        {meal.ingredients.map(ingredient => (
          <div key={meal.id}>- {ingredient.name}</div>)
        )}
      </div>
    )
  }
  
  export default MealCard