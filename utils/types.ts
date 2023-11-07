import type { Meal, Ingredient } from "@prisma/client";

export type MealWithIngredients = Meal & { ingredients: Ingredient[] };
