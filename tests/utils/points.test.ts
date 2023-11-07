import { calculatePoints, getUniqueIngredients } from "@/utils/points";
import { MealWithIngredients } from "@/utils/types";

describe(calculatePoints, () => {
  test("takes an array of meals and sums all the points of unique ingredients", () => {
    const meals = [
      {
        ingredients: [
          { id: "1", points: 1 },
          { id: "2", points: 1 },
        ],
      },
      {
        ingredients: [
          { id: "3", points: 1 },
          { id: "4", points: 0.25 },
        ],
      },
      {
        ingredients: [
          { id: "1", points: 1 },
          { id: "4", points: 0.25 },
        ],
      },
    ];

    const result = calculatePoints(meals as MealWithIngredients[]);
    const expected = 3.25;

    expect(result).toBe(expected);
  });
});

describe(getUniqueIngredients, () => {
  test("takes an array of meals and returns an array of unique ingredients", () => {
    const meals = [
      {
        ingredients: [
          { id: "1", points: 1 },
          { id: "2", points: 1 },
        ],
      },
      {
        ingredients: [
          { id: "3", points: 1 },
          { id: "4", points: 0.25 },
        ],
      },
      {
        ingredients: [
          { id: "1", points: 1 },
          { id: "4", points: 0.25 },
        ],
      },
    ];

    const result = getUniqueIngredients(meals as MealWithIngredients[]);
    const expected = [
      { id: "1", points: 1 },
      { id: "2", points: 1 },
      { id: "3", points: 1 },
      { id: "4", points: 0.25 },
    ];
    expect(result).toStrictEqual(expected);
  });
});
