import { MealWithIngredients } from "@/utils/types";

const MealCard = ({ meal }: { meal: MealWithIngredients }) => {
  const date = new Date(meal.eatenAt).toDateString();
  const points = meal.ingredients.reduce(
    (sum, ingredient) => sum + +ingredient.points,
    0,
  );

  return (
    <div className="bg-slate-50 rounded-lg shadow-lg h-60 overflow-scroll hover:bg-slate-200">
      <h4 className="text-xl font-semibold p-2 mb-1 mt-2">{meal.name}</h4>
      <div className="h-0.5 bg-slate-200"></div>
      <ul className="p-2">
        {meal.ingredients.map((ingredient) => (
          <li key={`${meal.id}_${ingredient.id}`}>- {ingredient.name}</li>
        ))}
      </ul>
      <ul>
        <li>Favourite</li>
        <li>Repeat</li>
      </ul>
    </div>
  );
};

export default MealCard;
