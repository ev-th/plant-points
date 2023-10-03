import { NavBar } from "@/components/NavBar"

type DashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen w-screen">
      <NavBar />
      <div>{children}</div>
    </div>
  )
}

export default DashboardLayout