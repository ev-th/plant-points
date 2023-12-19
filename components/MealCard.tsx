import Link from "next/link";

import { MealWithIngredients } from "@/utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faRepeat,
  faStar as farStarSolid,
} from "@fortawesome/free-solid-svg-icons";

const MealCard = ({ meal }: { meal: MealWithIngredients }) => {
  const date = new Date(meal.eatenAt).toDateString();
  const points = meal.ingredients.reduce(
    (sum, ingredient) => sum + +ingredient.points,
    0,
  );

  return (
    <div className="bg-slate-50 rounded-lg shadow-lg h-60 overflow-hidden flex flex-col relative">
      <Link role="link" href={`/meals/${meal.id}`}>
        <div className="p-2 hover:bg-slate-200">
          <h4 className="text-xl font-semibold mb-1 mt-2">{meal.name}</h4>
        </div>
      </Link>
      <div className="h-0.5 bg-slate-200"></div>
      <div className="p-2 flex-1 overflow-scroll">
        <ul className="overflow-scroll">
          {meal.ingredients.map((ingredient) => (
            <li key={`${meal.id}_${ingredient.id}`}>- {ingredient.name}</li>
          ))}
        </ul>
      </div>
      <ul className="flex absolute bottom-2 right-2 gap-4 ">
        <li>
          <FontAwesomeIcon
            icon={faStarRegular}
            className="w-6 text-[var(--green)]"
          />
        </li>
        <li>
          <FontAwesomeIcon
            icon={faRepeat}
            className="w-6 text-[var(--green)]"
          />
        </li>
      </ul>
    </div>
  );
};

export default MealCard;
