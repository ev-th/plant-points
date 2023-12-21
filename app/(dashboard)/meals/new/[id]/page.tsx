import MealForm from "@/components/MealForm";
import React from "react";
import { getIngredients, getMealWithIngredients } from "@/utils/dbQueries";

const RepeatMealPage = async ({ params }: { params: { id: string } }) => {
  const originalMeal = await getMealWithIngredients(params.id);
  const ingredients = await getIngredients();

  return (
    <div className="rounded border bg-slate-50 shadow-lg mx-4 my-4 sm:max-w-xl sm:mx-auto">
      <h1 className="text-3xl m-8 text-center font-bold">Repeat meal</h1>
      <div className="m-4">
        <MealForm ingredientOptions={ingredients} originalMeal={originalMeal} />
      </div>
    </div>
  );
};

export default RepeatMealPage;
