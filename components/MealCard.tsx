const MealCard = ({ meal }) => {
  const date = new Date(meal.eatenAt).toDateString()

    return (
      <div>
        <div>{meal.name}</div>
        <div>Eaten on {date}</div>
        <div>{meal.ingredients}</div>
      </div>
    )
  }
  
  export default MealCard