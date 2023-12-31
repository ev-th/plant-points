import Link from "next/link";

import MealCard from "@/components/MealCard";
import { MealWithIngredients } from "@/utils/types";
import { formatDate } from "@/utils/formatDate";

const DayOfMealsCard = ({ meals }: { meals: MealWithIngredients[] }) => {
  const date = formatDate(new Date(meals[0].eatenAt));
  return (
    <div className="bg-slate-100 max-w-7xl mx-auto">
      <p
        role="region"
        className="bg-[var(--green)] text-[var(--ivory)] w-20 rounded p-2 mb-2 text-center"
      >
        {date}
      </p>
      <ul role="list" className="flex flex-wrap flex-row">
        {meals.map((meal) => (
          <li key={meal.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 p-1">
            <MealCard meal={meal} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DayOfMealsCard;
