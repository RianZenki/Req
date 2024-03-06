import { NavLink, Outlet } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CaretDown, SignOut, User } from "phosphor-react"

export const Header = () => {
   return (
      <>
         <header className="w-full bg-brandColor-500 flex justify-between items-center text-base px-20">
            <div>
               <p>Logo</p>
            </div>

            <div className="flex items-center gap-10">
               <nav>
                  <ul className="flex itesm-center gap-10">
                     <li className="list-none flex items-center text-white">
                        <NavLink to="/solicitacao" className="flex items-center gap-1 py-6 text-xl text-white no-underline hover:underline">
                           Nova Solicitação
                        </NavLink>
                     </li>
                     <li>
                        <NavLink to="/home" className="flex items-center gap-1 py-6 text-xl text-white no-underline hover:underline">
                           Minhas solicitações
                        </NavLink>
                     </li>
                  </ul>
               </nav>

               <div className="flex items-center text-white cursor-pointer gap-2 relative">
                  <Avatar className="size-8">
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-ellipsis text-nowrap overflow-hidden max-w-[150px] text-white">Aluno</p>
                  <CaretDown size={16} weight="bold" color={"#ffffff"} />

                  <div className="flex absolute top-16 w-[200px] bg-brandColor-500 right-0 rounded z-10">
                     <ul className="w-full">
                        <li className="list-none w-full px-6 py-3 flex items-center text-white gap-4 text-base hover:bg-[#3498db]">
                           <NavLink to="/perfil" className="flex items-center gap-3 no-underline text-white" >
                           <User size={20} color={"#ffffff"} />
                           Perfil
                           </NavLink>
                        </li>
                        <li className="list-none w-full px-6 py-3 flex items-center text-white gap-4 text-base hover:bg-[#3498db]">
                           <SignOut size={20} color={"#ffffff"} />
                           Sair
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </header>
         <Outlet />
      </>
   )
}