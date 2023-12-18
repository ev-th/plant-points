import { calculatePoints, getUniqueIngredients } from "@/utils/points";
import { MealWithIngredients } from "@/utils/types";

const PointsCard = ({ meals }: { meals: MealWithIngredients[] }) => {
  const ingredients = getUniqueIngredients(meals);
  const points = calculatePoints(meals);

  const formatPoints = (points: number): string => {
    if (points >= 1) {
      return points.toString();
    }

    return points.toString().slice(1);
  };

  return (
    <div className="text-center shadow-lg rounded-xl py-4 bg-slate-50">
      <div role="region">
        Your plant points over the last 7 days:
        <div className="m-5 text-slate-50 inline-flex items-center justify-center h-16 w-16 rounded-full bg-[var(--green)]">
          <span className="text-2xl">{points}</span>
        </div>
      </div>
      <div className="h-0.5 bg-slate-200"></div>
      <ul
        role="list"
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 pt-5"
      >
        {ingredients.map((ingredient) => (
          <li className="flex justify-center my-1" key={ingredient.id}>
            {ingredient.name + " "}
            <div className="mx-2 text-slate-50 text-xs inline-flex items-center justify-center h-7 w-7 rounded-full bg-[var(--green)]">
              {formatPoints(ingredient.points)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PointsCard;
