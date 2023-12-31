import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="border-b border-black/10 py-4 px-6 bg-[var(--green)] text-slate-50">
      <ul className="flex m-0 p-0 justify-between items-center">
        <li>
          <Link role="link" href="/diary">
            Diary
          </Link>
        </li>
        <li>
          <Link role="link" href="/meals/new">
            Add Meal
          </Link>
        </li>
        <li>
          <Link role="link" href="/favorites">
            Favorites
          </Link>
        </li>
        <li>
          <Link role="link" href="/about">
            About
          </Link>
        </li>
        <li>
          <UserButton afterSignOutUrl="/" />
        </li>
      </ul>
    </nav>
  );
};
