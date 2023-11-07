import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import MealPage from "@/app/(dashboard)/meals/[id]/page";

const mocks = vi.hoisted(() => {
  return {
    getMeals: vi.fn(),
    getDateFromSixDaysAgo: vi.fn(),
    sortMealsByDay: vi.fn(),
  };
});

vi.mock("@/utils/getDateFromSixDaysAgo", () => {
  return {
    getDateFromSixDaysAgo: mocks.getDateFromSixDaysAgo,
  };
});
vi.mock("@/utils/dbQueries", () => {
  return {
    getMeals: mocks.getMeals,
  };
});
vi.mock("@/utils/sortMealsByDay", () => {
  return {
    sortMealsByDay: mocks.sortMealsByDay,
  };
});
vi.mock("@/components/PointsCard", () => {
  return {
    default: ({ meals }: { meals: string }) => <div>meals: {meals}</div>,
  };
});
