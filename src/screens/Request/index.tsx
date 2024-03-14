import { NavBar } from "@/components/NavBar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export const Request = () => {
   return (
      <div className="p-10">
         <NavBar />
         <div className="flex flex-col gap-4">
            <section className="space-y-5">
               <h2>Detalhes da solicitação</h2>
               <div className="flex gap-52">
                  <section className="flex flex-col gap-4">
                     <h3 className="text-xl font-bold">Informações do aluno</h3>
                     <div className="flex justify-between">
                        <div className="">
                           <strong>Nome</strong>
                           <p>João Silva</p>
                        </div>
                        <div className="">
                           <strong>RA</strong>
                           <p>99999999</p>
                        </div>
                     </div>
                     <div>
                        <strong>Curso</strong>
                        <p>Análise e desenvolvimento de sistemas</p>
                     </div>
                  </section>

                  <section className="flex flex-col gap-4">
                     <h3 className="text-xl font-bold">Informações do aluno</h3>
                     <div className="flex justify-between">
                        <div>
                           <strong>Tipo de solicitação</strong>
                           <p>Comprovante de estudante</p>
                        </div>
                        <div>
                           <strong>Status</strong>
                           <p>Finalizada</p>
                        </div>
                     </div>
                     <div className="flex justify-between">
                        <div>
                           <strong>Data de criação</strong>
                           <p>05/10/2022</p>
                        </div>
                        <div>
                           <strong>Data de termino</strong>
                           <p>--/--</p>
                        </div>
                     </div>
                  </section>
               </div>
            </section>

            <Separator />

            <section className="flex flex-col gap-8 justify-center items-center">
               <div  className="flex gap-4 w-full">
                  <Avatar className="size-9">
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="w-full rounded shadow">
                     <header className="flex gap-8 bg-brandColor-500 text-white p-2 rounded-t">
                        <p>João Silva</p>
                        <p>05/10/24</p>
                        <p>15:30</p>
                     </header>
                     <main>
                        <p>Pedido de comprovante de estudante</p>
                     </main>
                     <footer>
                        <p>Imagem</p>
                     </footer>
                  </div>
               </div>

               <Separator orientation="vertical" className="bg-black h-4" />

               <div  className="flex flex-row-reverse gap-4 w-full">
                  <Avatar className="size-9">
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="w-full rounded shadow">
                     <header className="flex gap-8 bg-brandColor-500 text-white p-2 rounded-t">
                        <p>Claudia Carvalho</p>
                        <p>06/10/2024</p>
                        <p>09:30</p>
                     </header>
                     <main>
                        <p>Documento será enviado para o e-mail em 2 dias uteis.</p>
                     </main>
                     <footer>
                        <p>Imagem</p>
                     </footer>
                  </div>
               </div>

               <Separator orientation="vertical" />

               <div>
                  <p>Solicitação encerrada por Claudia</p>
               </div>
            </section>

            <Separator />
         </div>
      </div>
   )
}