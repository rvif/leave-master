import Image from "next/image";
import { TiThMenu } from "react-icons/ti";
import ToggleDarkLight from "./ToggleDarkLight";
import { RenderRoutes } from "./RenderRoutes";
import { AdminRoutes, ModeratorRoutes, UserRoutes } from "./Routes";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { User } from "@prisma/client";
import LogoutBtn from "./LogoutBtn";

type SideBarDrawerProps = {
  user: User;
};

const SideBarDrawer = ({ user }: SideBarDrawerProps) => {
  const adminRouter = () => {
    return <>{RenderRoutes({ routes: AdminRoutes })}</>;
  };

  const userRouter = () => {
    return <>{RenderRoutes({ routes: UserRoutes })}</>;
  };

  const moderatorRouter = () => {
    return <>{RenderRoutes({ routes: ModeratorRoutes })}</>;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 bg-blue-100 rounded-full text-blue-500">
          <TiThMenu size={24} />
        </button>
      </SheetTrigger>

      {/* Sidebar content */}
      <SheetContent side="left" className="flex flex-col justify-between w-52">
        {/* Logo */}
        <div className="flex mt-3 justify-center">
          <Image src="/logo.png" width={50} height={50} alt="logo" />
        </div>

        {/* Centered Nav Section */}
        <nav className="flex flex-col items-center px-3 overflow-y-auto flex-grow justify-center">
          {user?.role === "ADMIN" && adminRouter()}
          {user?.role === "USER" && userRouter()}
          {user?.role === "MODERATOR" && moderatorRouter()}
        </nav>

        {/* Footer with Logout and Theme Toggle */}
        <div className="flex items-center justify-around pb-4">
          <ToggleDarkLight />
          <button className="text-slate-500 dark:text-slate-300">
            <LogoutBtn />
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBarDrawer;
