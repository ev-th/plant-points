import MealForm from "@/components/MealForm";
import { prisma } from "@/utils/db";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const mocks = vi.hoisted(() => {
  return {
    useRouter: vi.fn(),
  };
});

vi.mock("next/navigation", () => {
  return {
    useRouter: mocks.useRouter,
  };
});

describe(MealForm, () => {
  describe("when not passed a meal", () => {
    test.todo("it adds a new meal to the database", async () => {
      const ingredient1 = await prisma.ingredient.create({
        data: {
          name: "ingredient1",
          points: 1,
        },
      });
      const ingredient2 = await prisma.ingredient.create({
        data: {
          name: "ingredient2",
          points: 0.5,
        },
      });

      const { getByLabelText, getByRole } = render(
        <MealForm ingredientOptions={[ingredient1, ingredient2]} />,
      );

      await act(async () => {
        fireEvent.change(getByLabelText("Meal Name:"), {
          target: { value: "testMealName" },
        });
      });

      await act(async () => {
        fireEvent.change(getByLabelText("Date Eaten:"), {
          target: { value: new Date("2023-09-15") },
        });
      });

      await act(async () => {
        fireEvent.keyDown(getByLabelText("Ingredients:"), { key: "ArrowDown" });
        fireEvent.click(screen.getByText("ingredient2"));
        // const existingItem = await screen.getByText('ingredient2')
        // fireEvent.change(getByLabelText("Ingredients"), {target: {value: [{value: ingredient1.id, label: ingredient1.name}]}})
      });
    });

    test.todo("it does not display the delete button");

    describe("with no name", () => {
      test.todo("renders the name error");
    });

    describe("with no ingredients", () => {
      test.todo("renders the ingredients error");
    });
  });

  describe("when passed a meal", () => {
    test.todo("edits the meal on the database");

    test.todo("the delete button deletes the meal from the database");

    describe("with no name", () => {
      test.todo("renders the name error");
    });

    describe("with no ingredients", () => {
      test.todo("renders the ingredients error");
    });
  });
});
