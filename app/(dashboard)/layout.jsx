import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import '@/app/assets/main-style.css';

const layout = async ({ children }) => {
  return (
    <DashBoardLayoutProvider>{children}</DashBoardLayoutProvider>
  );
};

export default layout;
