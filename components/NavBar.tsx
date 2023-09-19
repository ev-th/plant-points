import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

export const NavBar = () => {
  return (
    <nav className="border-b border-black/10 p-4">
      <ul className="flex m-0 p-0 justify-between items-center">
        <li>
          <Link href="/diary">Plant Points</Link>
          
        </li>
        <li>
          New Recipe
        </li>
        <li>
          Add to Diary
        </li>
        <li>
          <UserButton />
        </li>
      </ul>
  </nav>
  )
}
