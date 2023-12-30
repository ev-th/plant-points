import { prisma } from "@/utils/db";
import { getUserByClerkId } from "@/utils/auth";
import { MealWithIngredients } from "@/utils/types";

export const getIngredients = async () => {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return ingredients;
};

export const getMealWithIngredients = async (
  id: string,
): Promise<MealWithIngredients> => {
  const user = await getUserByClerkId();

  if (!user) {
    throw new Error("Authentication failed.");
  }

  return prisma.meal.findUniqueOrThrow({
    where: {
      userId: user.id,
      id,
    },
    include: {
      ingredients: true,
    },
  });
};

export const getMealsByDate = async (
  dateFrom: Date,
  dateTo: Date,
): Promise<MealWithIngredients[]> => {
  const user = await getUserByClerkId();

  return prisma.meal.findMany({
    where: {
      userId: user.id,
      eatenAt: {
        lte: dateTo,
        gte: dateFrom,
      },
    },
    include: {
      ingredients: true,
    },
  });
};

export const getFavoriteMeals = async (): Promise<MealWithIngredients[]> => {
  const user = await getUserByClerkId();

  return prisma.meal.findMany({
    where: {
      userId: user.id,
      favorite: true,
    },
    include: {
      ingredients: true,
    },
  });
};
