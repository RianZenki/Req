import { CaretDown, ChartBar, House, SignOut, UserList } from "phosphor-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSecretaryContext } from "@/contexts/SecretaryContext";
import { NavLink, Outlet } from "react-router-dom";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import logo from "@/assets/logo.svg";

export const SideHeader = () => {
   const { secretary, handleLogout } = useSecretaryContext();

   return (
      <div className="flex gap-4 relative">
         <header className="h-screen min-h-full top-0 w-[300px] min-w-[300px] bg-brandColor-500 flex flex-col shadow-[0_0_8px_rgba(0,0,0,0.2)] sticky">
            <div className="w-full py-3">
               <img className="mx-auto w-28" src={logo} alt="Req logo" />
            </div>

            <nav className="flex flex-1 border-t border-t-blue-400">
               <ul className="w-full">
                  <li>
                     <NavLink
                        to="/secretario/home"
                        className={({ isActive }) =>
                           `flex w-full text-white items-center gap-3 px-4 py-3 ${
                              isActive
                                 ? "bg-brandColor-700"
                                 : "bg-brandColor-500"
                           }`
                        }
                     >
                        <House size={24} />
                        Home
                     </NavLink>
                  </li>

                  {secretary?.cargo === "SECRETARIO_GERAL" && (
                     <>
                        <li>
                           <NavLink
                              to="/secretario/secretarios"
                              className={({ isActive }) =>
                                 `flex w-full text-white items-center gap-3 px-4 py-3 ${
                                    isActive
                                       ? "bg-brandColor-700"
                                       : "bg-brandColor-500"
                                 }`
                              }
                           >
                              <UserList size={24} />
                              <span>Secretários</span>
                           </NavLink>
                        </li>
                        <li>
                           <NavLink
                              to="/secretario/dashboard"
                              className={({ isActive }) =>
                                 `flex w-full text-white items-center gap-3 px-4 py-3 ${
                                    isActive
                                       ? "bg-brandColor-700"
                                       : "bg-brandColor-500"
                                 }`
                              }
                           >
                              <ChartBar size={24} />
                              Dashboard
                           </NavLink>
                        </li>
                     </>
                  )}
               </ul>
            </nav>

            <DropdownMenu>
               <DropdownMenuTrigger className="flex items-center justify-center py-5 text-white cursor-pointer gap-4 focus:outline-none border-t border-t-blue-400">
                  <Avatar className="size-9">
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-ellipsis text-xl text-nowrap overflow-hidden max-w-[150px] text-left flex-1 text-white">
                     {secretary?.nome}
                  </p>
                  <CaretDown size={20} weight="bold" color={"#ffffff"} />
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-[300px] bg-brandColor-700 border-none">
                  <DropdownMenuItem
                     className="w-full cursor-pointer py-3.5 flex items-center gap-3 text-lg text-white focus:text-white focus:bg-brandColor-700"
                     onClick={handleLogout}
                  >
                     <SignOut size={24} />
                     Sair
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </header>
         <Outlet />
      </div>
   );
};
