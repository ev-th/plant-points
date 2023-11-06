import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export const NavBar = () => {
  return (
    <nav className="border-b border-black/10 p-4 bg-[var(--green)] text-[var(--ivory)]">
      <ul className="flex m-0 p-0 justify-between items-center">
        <li>
          <Link role="link" href="/diary">Diary</Link>
          
        </li>
        <li>
          <Link role="link" href="/meals/new">
            Add Meal
          </Link>
        </li>
        <li>
          <UserButton/>
        </li>
      </ul>
    </nav>
  )
}
