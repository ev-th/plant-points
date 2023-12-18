import { render, screen } from "@testing-library/react";
import MealCard from "@/components/MealCard";
import { MealWithIngredients } from "@/utils/types";

describe(MealCard, () => {
  const meal = {
    id: "testId",
    name: "testName",
    eatenAt: new Date("2023-10-12"),
    ingredients: [
      { id: "ingredientId1", name: "testIngredient1", points: 1 },
      { id: "ingredientId2", name: "testIngredient2", points: 2 },
      { id: "ingredientId3", name: "testIngredient3", points: 0.25 },
    ],
  } as MealWithIngredients;

  test("displays the meal name", () => {
    render(MealCard({ meal }));
    expect(screen.getByText("testName")).toBeInTheDocument();
  });

  test("displays the ingredients", () => {
    render(MealCard({ meal }));
    expect(screen.getByText("- testIngredient1")).toBeInTheDocument();
    expect(screen.getByText("- testIngredient2")).toBeInTheDocument();
    expect(screen.getByText("- testIngredient3")).toBeInTheDocument();
  });
});
