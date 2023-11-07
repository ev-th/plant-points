import { render, screen } from "@testing-library/react";
import { NavBar } from "@/components/NavBar";
import { vi } from "vitest";

vi.mock("@clerk/nextjs", () => {
  return {
    UserButton: () => <div>Clerk User Button</div>,
  };
});

describe(NavBar, () => {
  test("has the title with a link to the diary page", () => {
    render(NavBar());
    const element = screen.getAllByRole("link")[0];
    expect(element).toHaveTextContent("Plant Points");
    expect(element.getAttribute("href")).toBe("/diary");
  });

  test("has a link to add a new diary entry", () => {
    render(NavBar());
    const element = screen.getAllByRole("link")[1];
    expect(element).toHaveTextContent("Add to Diary");
    expect(element.getAttribute("href")).toBe("/meals/new");
  });

  test("contains the Clerk UserButton", () => {
    render(NavBar());
    const element = screen.getByText("Clerk User Button");
    expect(element).toBeInTheDocument();
  });
});
