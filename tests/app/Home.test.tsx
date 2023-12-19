import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Home from "@/app/page";

const mocks = vi.hoisted(() => {
  return {
    auth: vi.fn(),
  };
});

vi.mock("@clerk/nextjs", () => {
  return {
    auth: mocks.auth,
    ClerkProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "fake_id",
        fullName: "Fake Name",
      },
    }),
  };
});

describe(Home, () => {
  test("has title", () => {
    mocks.auth.mockReturnValue({ userId: "fake_id" });
    render(Home());
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Plant Point Tracker",
    );
  });

  test("has description", () => {
    mocks.auth.mockReturnValue({ userId: "fake_id" });
    render(Home());
    expect(screen.getByRole("region")).toHaveTextContent(
      "A diary to keep track",
    );
  });

  test("has button", () => {
    mocks.auth.mockReturnValue({ userId: "fake_id" });
    render(Home());
    expect(screen.getByRole("link")).toHaveTextContent("Get started");
  });

  test("button redirects to diary page when user is logged in", () => {
    mocks.auth.mockReturnValue({ userId: "fake_id" });
    render(Home());
    expect(screen.getByRole("link").getAttribute("href")).toBe("/diary");
  });

  test("button redirects to new-user page when user is logged out", () => {
    mocks.auth.mockReturnValue({ userId: null });
    render(Home());
    expect(screen.getByRole("link").getAttribute("href")).toBe("/new-user");
  });
});
