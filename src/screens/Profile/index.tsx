import { NavBar } from "@/components/NavBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CaretRight, Key, User } from "phosphor-react";
import { StudantData } from "./components/StudantData";
import { ChangePassword } from "./components/ChangePassword";

export const Profile = () => {
   return (
      <div className="w-full max-w-[1600px] px-20 mx-auto mt-10">
         <NavBar />
         <h2 className="mt-10 text-3xl font-bold px-24">Meu perfil</h2>

         <Tabs defaultValue="account" className="flex mt-10 px-24">
            <TabsList className="flex flex-col h-[110px] text-base mr-6">
               <TabsTrigger
                  value="account"
                  className="aria-selected:font-bold gap-3 p-4 justify-between w-[300px]"
               >
                  <User size={20} />
                  <span className="mr-auto">Dados do aluno</span>
                  <CaretRight size={20} />
               </TabsTrigger>
               <TabsTrigger
                  value="password"
                  className="aria-selected:font-bold gap-3 p-4 justify-between w-[300px] "
               >
                  <Key size={20} />
                  <span className="mr-auto">Alterar senha</span>
                  <CaretRight size={20} />
               </TabsTrigger>
            </TabsList>
            <TabsContent
               value="account"
               className="flex flex-col gap-8 mt-0 data-[state=active]:w-full"
            >
               <StudantData />
            </TabsContent>
            <TabsContent
               value="password"
               className="flex flex-col gap-8 mt-0 data-[state=active]:w-full"
            >
               <ChangePassword />
            </TabsContent>
         </Tabs>
      </div>
   );
};
