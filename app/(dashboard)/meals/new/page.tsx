import MealForm from "@/components/MealForm";
import React from "react";
import { getIngredients } from "@/utils/dbQueries";

const NewMealPage = async () => {
  const ingredients = await getIngredients();

  return (
    <div className="rounded border bg-slate-50 shadow-lg mx-4 my-4 sm:max-w-xl sm:mx-auto">
      <h1 className="text-3xl m-8 text-center font-bold">Add a new meal</h1>
      <div className="m-4">
        <MealForm ingredientOptions={ingredients} />
      </div>
    </div>
  );
};

export default NewMealPage;
