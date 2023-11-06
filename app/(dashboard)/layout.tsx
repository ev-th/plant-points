import { NavBar } from "@/components/NavBar"

type DashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-full w-full bg-slate-100">
      <NavBar />
      <div>{children}</div>
    </div>
  )
}

export default DashboardLayout