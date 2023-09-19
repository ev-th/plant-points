import { NavBar } from "@/components/NavBar"

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen">
      <NavBar />
      <div>{children}</div>
    </div>
  )
}

export default DashboardLayout