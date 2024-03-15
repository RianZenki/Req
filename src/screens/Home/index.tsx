import { columns } from "@/components/RequestTable/columns";
import { DataTable } from "@/components/RequestTable/data-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { data } from "@/utils/fake-data";
import { requestTypes } from "@/utils/request-types";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Plus } from "phosphor-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [access, setAccess] = useState(false);
  const [disciplineRush, setDisciplineRush] = useState(false);
  const [signature, setSignature] = useState(false);
  const [cancellation, setCancellation] = useState(false);
  const [fatecCard, setFatecCard] = useState(false);
  const [registrationProof, setRegistrationProof] = useState(false);
  const [programContent, setProgramContent] = useState(false);
  const [abandoningSubjects, setAbandoningSubjects] = useState(false);
  const [schoolRecords, setSchoolRecords] = useState(false);
  const [information, setInformation] = useState(false);
  const [contractTemplates, setContractTemplates] = useState(false);
  const [lockout, setLockout] = useState(false);

  const navigate = useNavigate()

   return (
      <div className="w-full max-w-[1600px] px-20 mx-auto mt-10">
         <div className="flex justify-between items-center">
            <div>
               <h2 className="text-4xl font-bold mb-1">Minhas solicitações</h2>
               <p className="text-muted-foreground">
                  Aqui estão suas solicitações
               </p>
            </div>
            <button onClick={() => navigate("/nova-solicitacao")} className="w-[200px] h-12 px-5 py-4 rounded bg-brandColor-700 text-white transition hover:bg-[#2672f9] flex items-center gap-2">
               <Plus size={24} color={"#FFF"} />
               Nova solicitação
            </button>
         </div>

         <div className="mt-12">
            <div className="space-x-6 flex">
               <input
                  className="w-[250px] border rounded px-3 py-1.5 shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Pesquisar aluno..."
               />

               <div className="flex gap-6">
                  <DropdownMenu>
                     <DropdownMenuTrigger className="w-[230px] h-9.25" asChild >
                        <Button variant="outline" className="flex justify-between font-semibold">
                        Tipo de solicitação <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-[230px]">
                        <DropdownMenuLabel>Tipo de solicitação</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                           <DropdownMenuCheckboxItem
                              checked={access}
                              onCheckedChange={setAccess}
                              >
                              Acesso e senhas
                           </DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem
                              checked={disciplineRush}
                              onCheckedChange={setDisciplineRush}
                              >
                              Apressamento de disciplina
                           </DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem
                              checked={signature}
                              onCheckedChange={setSignature}
                              >
                              Assinaturas
                           </DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem
                              checked={cancellation}
                              onCheckedChange={setCancellation}
                              >
                              Cancelamento
                           </DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem
                              checked={fatecCard}
                              onCheckedChange={setFatecCard}
                              >
                              Carteirinha Fatec
                           </DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem
                              checked={registrationProof}
                              onCheckedChange={setRegistrationProof}
                              >
                              Comprovante de matricula
                           </DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem
                              checked={programContent}
                              onCheckedChange={setProgramContent}
                              >
                              Conteúdos programáticos
                           </DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem
                              checked={abandoningSubjects}
                              onCheckedChange={setAbandoningSubjects}
                              >
                              Desitência de disciplinas
                           </DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem
                              checked={schoolRecords}
                              onCheckedChange={setSchoolRecords}
                              >
                              Histórico Escolar
                           </DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem
                              checked={information}
                              onCheckedChange={setInformation}
                              >
                              Informações
                           </DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem
                              checked={contractTemplates}
                              onCheckedChange={setContractTemplates}
                              >
                              Modelos de Contratos
                           </DropdownMenuCheckboxItem>
                           <DropdownMenuCheckboxItem
                              checked={lockout}
                              onCheckedChange={setLockout}
                              >
                              Trancamento
                           </DropdownMenuCheckboxItem>
                     </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                     <DropdownMenuTrigger className="w-[180px] h-9.25" asChild >
                        <Button variant="outline" className="flex justify-between font-semibold">
                        Status <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                     </DropdownMenuTrigger>
                     <DropdownMenuContent className="w-[180px]">
                        <DropdownMenuLabel>Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                           checked={access}
                           onCheckedChange={setAccess}
                           >
                           Em andamento
                        </DropdownMenuCheckboxItem>
                        {/* <DropdownMenuCheckboxItem
                           checked={requestType.abandoningSubjects}
                           onCheckedChange={() => setRequestType(prev => ({...requestType, abandoningSubjects: !prev.abandoningSubjects}))}
                           >
                           Finalizado
                        </DropdownMenuCheckboxItem> */}
                     </DropdownMenuContent>
                  </DropdownMenu>
               </div>

            </div>

            <div className="w-full py-8">
               <DataTable columns={columns} data={data} />
            </div>
         </div>
      </div>
   );
};
