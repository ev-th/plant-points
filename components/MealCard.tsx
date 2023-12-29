"use client";

import Link from "next/link";
import { useState } from "react";

import { MealWithIngredients } from "@/utils/types";
import { updateMeal } from "@/utils/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faRepeat,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";

const MealCard = ({ meal }: { meal: MealWithIngredients }) => {
  const [favorite, setFavorite] = useState(meal.favorite);

  const toggleFavorite = async () => {
    console.log("hello");
    const m = await updateMeal({
      id: meal.id,
      name: meal.name,
      ingredientIds: meal.ingredients.map((ingredient) => ingredient.id),
      date: meal.eatenAt,
      favorite: !favorite,
    });
    setFavorite((favorite) => !favorite);
  };

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
      <ul className="flex items-center justify-end p-4 gap-4">
        <li>
          <button onClick={toggleFavorite}>
            {favorite ? (
              <FontAwesomeIcon
                icon={faStarSolid}
                className="w-8 p-1 text-[var(--green)] rounded-md hover:bg-slate-200"
              />
            ) : (
              <FontAwesomeIcon
                icon={faStarRegular}
                className="w-8 p-1 text-[var(--green)] rounded-md hover:bg-slate-200"
              />
            )}
          </button>
        </li>
        <li>
          <Link role="link" href={`/meals/new/${meal.id}`}>
            <FontAwesomeIcon
              icon={faRepeat}
              className="w-8 p-1 text-[var(--green)] rounded-md hover:bg-slate-200"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MealCard;
