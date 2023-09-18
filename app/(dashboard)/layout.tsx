import { NavBar } from "@/components/NavBar"
import { UserButton } from "@clerk/nextjs"

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <NavBar />
      <div>{children}</div>
    </div>
  )
}

export default DashboardLayout