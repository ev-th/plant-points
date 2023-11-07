import prisma from "../helpers/prisma";
import {
  getIngredients,
  getMealWithIngredients,
  getMeals,
} from "@/utils/dbQueries";
import { vi } from "vitest";
import { User } from "@prisma/client";

const mocks = vi.hoisted(() => {
  return {
    getUserByClerkId: vi.fn(),
  };
});

vi.mock("@/utils/auth", () => {
  return {
    getUserByClerkId: mocks.getUserByClerkId,
  };
});

let mealId: string;
let currentUser: User;

describe(getIngredients, () => {
  test("gets all the ingredients from the db in alphabetical order", async () => {
    await prisma.ingredient.createMany({
      data: [
        { name: "apple", points: 1 },
        { name: "pineapple", points: 1 },
        { name: "melon", points: 1 },
        { name: "banana", points: 1 },
      ],
    });

    const ingredients = await getIngredients();

    expect(ingredients[0].name).toBe("apple");
    expect(ingredients[1].name).toBe("banana");
    expect(ingredients[2].name).toBe("melon");
    expect(ingredients[3].name).toBe("pineapple");
    expect(ingredients.length).toBe(4);
  });
});

describe(getMealWithIngredients, () => {
  beforeEach(async () => {
    const ingredient = await prisma.ingredient.create({
      data: { name: "apple", points: 1 },
    });
    const user = await prisma.user.create({
      data: {
        clerkId: "testClerkId",
        email: "test@example.com",
      },
    });
    const meal = await prisma.meal.create({
      data: {
        name: "apple bobbing",
        eatenAt: new Date("2022-10-31"),
        userId: user.id,
        ingredients: {
          connect: [ingredient],
        },
      },
    });
    mealId = meal.id;
    currentUser = user;
  });

  describe("when user is signed in", () => {
    describe("when meal exists and associated with the user", () => {
      test("gets the meal", async () => {
        mocks.getUserByClerkId.mockReturnValueOnce(currentUser);
        const meal = await getMealWithIngredients(mealId);
        expect(meal.name).toBe("apple bobbing");
      });
    });

    describe("when meal exists but not associated with the user", () => {
      test.todo("throws an error", async () => {
        mocks.getUserByClerkId.mockReturnValueOnce("wrongUserId");
        await expect(
          async () => await getMealWithIngredients(mealId),
        ).rejects.toThrow();
      });
    });

    describe("when meal does not exist", () => {
      test.todo("throws an error", async () => {
        mocks.getUserByClerkId.mockReturnValueOnce(currentUser);
        await expect(
          async () => await getMealWithIngredients("nonExistentMeal"),
        ).rejects.toThrow();
      });
    });
  });
});

describe(getMeals, () => {
  test("gets all the meals of the user from the database", async () => {
    const user1 = await prisma.user.create({
      data: {
        email: "thisUser@example.com",
        clerkId: "thisUserClerkId",
      },
    });

    const user2 = await prisma.user.create({
      data: {
        email: "otherUser@example.com",
        clerkId: "otherUserClerkId",
      },
    });

    const ingredient1 = await prisma.ingredient.create({
      data: { name: "testIngredient1", points: 1 },
    });
    const ingredient2 = await prisma.ingredient.create({
      data: { name: "testIngredient2", points: 2 },
    });
    const ingredient3 = await prisma.ingredient.create({
      data: { name: "testIngredient3", points: 3 },
    });

    const meal1 = await prisma.meal.create({
      data: {
        userId: user1.id,
        name: "testMeal1",
        ingredients: { connect: [ingredient1, ingredient2] },
        eatenAt: new Date("2023-10-09"),
      },
      include: {
        ingredients: true,
      },
    });
    const meal2 = await prisma.meal.create({
      data: {
        userId: user1.id,
        name: "testMeal2",
        ingredients: { connect: [ingredient3] },
        eatenAt: new Date("2023-10-04"),
      },
      include: {
        ingredients: true,
      },
    });
    // Meal from before dateFrom should not show up in the results
    const meal3 = await prisma.meal.create({
      data: {
        userId: user1.id,
        name: "testMeal3",
        ingredients: { connect: [ingredient1, ingredient2] },
        eatenAt: new Date("2023-10-03"),
      },
      include: {
        ingredients: true,
      },
    });
    // Meal from after dateTo should not show up in the results
    const meal4 = await prisma.meal.create({
      data: {
        userId: user1.id,
        name: "testMeal4",
        ingredients: { connect: [ingredient3] },
        eatenAt: new Date("2023-10-10"),
      },
    });
    // Meal associated with a different user should not show up in results
    const meal5 = await prisma.meal.create({
      data: {
        userId: user2.id,
        name: "testMeal5",
        ingredients: { connect: [ingredient2, ingredient3] },
        eatenAt: new Date("2023-10-09"),
      },
    });

    mocks.getUserByClerkId.mockReturnValueOnce(user1);

    const meals = await getMeals(
      new Date("2023-10-04"),
      new Date("2023-10-09"),
    );

    meals.sort((a, b) => +b.eatenAt - +a.eatenAt);

    expect(meals).toStrictEqual([meal1, meal2]);
  });
});
