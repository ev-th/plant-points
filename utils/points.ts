import { Ingredient } from "@prisma/client";
import { MealWithIngredients } from "./types";

export const calculatePoints = (meals: MealWithIngredients[]) => {
  const ingredients = getUniqueIngredients(meals);
  return ingredients.reduce((sum, ingredient) => sum + ingredient.points, 0);
};

export const getUniqueIngredients = (
  meals: MealWithIngredients[],
): Ingredient[] => {
  const checked: Record<string, boolean> = {};
  const ingredients: Ingredient[] = [];

  meals.forEach((meal) => {
    meal.ingredients.forEach((ingredient) => {
      if (!checked[ingredient.id]) {
        checked[ingredient.id] = true;
        ingredients.push(ingredient);
      }
    });
  });

  return ingredients;
};
