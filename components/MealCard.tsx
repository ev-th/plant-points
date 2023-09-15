const MealCard = ({ meal }) => {
  const date = new Date(meal.eatenAt).toDateString()

    return (
      <div>
        <div>{meal.recipe.name}</div>
        <div>Eaten on {date}</div>
        <div>{meal.recipe.ingredients}</div>
      </div>
    )
  }
  
  export default MealCard