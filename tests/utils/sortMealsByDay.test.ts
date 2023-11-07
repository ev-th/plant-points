import { sortMealsByDay } from "@/utils/sortMealsByDay";
import { MealWithIngredients } from "@/utils/types";

describe(sortMealsByDay, () => {
  test("returns a two dimensional array of meals grouped by day in reverse chronological order", () => {
    const meal1 = { eatenAt: new Date("2023-10-13") } as MealWithIngredients;
    const meal2 = { eatenAt: new Date("2023-10-12") } as MealWithIngredients;
    const meal3 = { eatenAt: new Date("2023-10-14") } as MealWithIngredients;
    const meal4 = { eatenAt: new Date("2023-10-15") } as MealWithIngredients;
    const meal5 = { eatenAt: new Date("2023-10-12") } as MealWithIngredients;
    const meal6 = { eatenAt: new Date("2023-10-13") } as MealWithIngredients;
    const meals = [meal1, meal2, meal3, meal4, meal5, meal6];

    const expected = [[meal4], [meal3], [meal1, meal6], [meal2, meal5]];

    const result = sortMealsByDay(meals);

    expect(result).toStrictEqual(expected);
  });
});
