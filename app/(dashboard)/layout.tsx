import { NavBar } from "@/components/NavBar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
