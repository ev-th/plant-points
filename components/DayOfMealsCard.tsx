import MealCard from "./MealCard"

const DayOfMealsCard = ({meals}) => {
  const date = new Date(meals[0].eatenAt).toDateString()
  return (
    <div className="bg-pink-200 p-2 rounded-lg">
      <p>DAY OF MEALS CARD</p>
      <p>Eaten on {date}</p>
      {meals.map(meal => <MealCard key={meal.id} meal={meal}/>)}
    </div>
  )
}

export default DayOfMealsCard