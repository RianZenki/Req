import { NavBar } from "@/components/NavBar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export const Request = () => {
   return (
      <div className="w-full max-w-[1600px] px-32 mx-auto mt-10 flex flex-col gap-6">
         <NavBar />
         <div className="px-24 flex flex-col gap-4">
            <section className="space-y-10">
               <h2 className="text-4xl font-bold">Detalhes da solicitação</h2>
               <div className="flex w-full justify-between gap-10">
                  <section className="flex flex-col gap-5 w-full max-w-[500px]">
                     <h3 className="text-xl font-semibold">Informações do aluno</h3>
                     <div className="flex">
                        <div className="w-[50%]">
                           <strong className="text-lg font-semibold">Nome do aluno</strong>
                           <p>João Silva</p>
                        </div>
                        <div className="w-[50%]">
                           <strong className="text-lg font-semibold">RA</strong>
                           <p>99999999</p>
                        </div>
                     </div>
                     <div className="flex">
                        <div className="w-[100%]">
                           <strong className="text-lg font-semibold">Curso</strong>
                           <p>Análise e desenvolvimento de sistemas</p>
                        </div>
                     </div>
                  </section>

                  <section className="flex flex-col gap-5 pr-20 w-full max-w-[500px]">
                     <h3 className="text-xl font-semibold">Informações da solicitação</h3>
                     <div className="flex">
                        <div className="w-[50%]">
                           <strong className="text-lg font-semibold">Status</strong>
                           <div className="flex gap-2 items-center">
                              <span className="inline-block size-4 bg-green-500 rounded-full" />
                              <p>Finalizada</p>
                           </div>
                        </div>
                        <div className="w-[50%]">
                           <strong className="text-lg font-semibold">Tipo de solicitação</strong>
                           <p>Comprovante de estudante</p>
                        </div>
                     </div>
                     <div className="flex">
                        <div className="w-[50%]">
                           <strong className="text-lg font-semibold">Data de criação</strong>
                           <p>05/10/2022</p>
                        </div>
                        <div className="w-[50%]">
                           <strong className="text-lg font-semibold">Data de conclusão</strong>
                           <p>--/--</p>
                        </div>
                     </div>
                  </section>
               </div>
            </section>

            <Separator />

            <section className="flex flex-col gap-5 my-10 justify-center items-center">
               <div  className="flex gap-4 w-full">
                  <Avatar className="size-9">
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="w-full rounded shadow">
                     <header className="flex gap-8 bg-brandColor-500 p-2 rounded-t">
                        <p className="text-white text-sm font-light">
                           <strong className="font-semibold">João Silva</strong> enviou 05/10/2024 15:30
                        </p>
                     </header>
                     <div className="flex flex-col gap-4 px-2 py-4">
                        <main>
                           <p>Pedido de comprovante de estudante</p>
                        </main>
                        <footer>
                           <p>Imagem</p>
                        </footer>
                     </div>
                  </div>
               </div>

               <Separator orientation="vertical" className="h-6" />

               <div  className="flex flex-row-reverse gap-4 w-full">
                  <Avatar className="size-9">
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="w-full rounded shadow">
                     <header className="flex gap-8 bg-slate-500 p-2 rounded-t">
                        <p className="text-white text-sm font-light">
                           <strong className="font-semibold">Edinaldo Pereira</strong> enviou 05/10/2024 15:30
                        </p>
                     </header>
                     <div className="flex flex-col gap-4 px-2 py-4">
                        <main>
                           <p>Comprovante será enviado por e-mail em até 2 dias</p>
                        </main>
                     </div>
                  </div>
               </div>

               <Separator orientation="vertical" className="h-6" />

               <div className="px-4 py-2 shadow rounded bg-slate-400 text-white">
                  <p>Solicitação encerrada por Edinaldo Pereira em 08/10/2023 10:34</p>
               </div>
            </section>

            <Separator />

            <section className="my-10">
               <h3 className="font-bold text-3xl mb-6">Adicionar nova resposta</h3>
               <form className="flex flex-col gap-5">
                  <section>
                     <label htmlFor="description" className="inline-block font-semibold text-2xl">Descrição</label>
                     <p className="text-muted-foreground text-sm mb-3">Infome a descrição e dados adicionais sobre a solicitação</p>
                     <Textarea id="description" placeholder="Informe a descrição da solicitação" rows={6} className="resize-none text-base bg-[#f5f5f5] focus-visible:ring-brandColor-700" />
                  </section>

                  <Separator />

                  <section>
                     <label htmlFor="" className="inline-block font-semibold text-2xl">Anexar arquivo</label>
                     <p className="text-muted-foreground text-sm mb-3">Anexe arquivos necessários para a realização da solicitação</p>
                     <input type="file" name="" id="" />
                     use-file-picker
                  </section>

                  <button className="w-[200px] h-12 px-5 py-4 rounded bg-brandColor-700 text-white transition hover:bg-[#2672f9] flex items-center justify-center self-end">Enviar Resposta</button>
               </form>
            </section>
         </div>
      </div>
   )
}