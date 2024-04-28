import { NavBar } from "@/components/NavBar";
import { Separator } from "@/components/ui/separator";
import api from "@/services/api";
import { IRequest } from "@/utils/request-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InfoSection } from "../../Request/components/InfoSection";
import { NewResponse } from "../../Request/components/NewResponse";
import { Button } from "@/components/Button";
import { ResponseSection } from "../../Request/components/ResponseSection";
import { IResponse } from "@/utils/response-types";
import { toast } from "react-toastify";
import { FinalizeButton } from "../../Request/components/FinalizeButton";
import { useSecretaryContext } from "@/contexts/SecretaryContext";

export const Request = () => {
   const { id } = useParams();
   const [request, setRequest] = useState<IRequest>();
   const [responses, setResponses] = useState<IResponse[]>([]);
   const [showForm, setShowForm] = useState(false);
   const { secretary } = useSecretaryContext()

   const getRequest = async () => {
      try {
         const response = await api.get(`/solicitacao/${id}`);
         setRequest(response.data);
         setResponses(response.data.Resposta);
      } catch (error: any) {
         toast.error(error.response.data.msg);
      }
   };

   const handleFinalizeRequest = async () => {
      try {
         const response = await api.put(`/solicitacao/${id}`, {
            status: "finalizado",
            secretario: secretary?.nome
         });
         setRequest(response.data.solicitacao);
         toast.success(response.data.msg);
      } catch (error: any) {
         toast.error(error.response.data.msg);
      }
   };

   const handleUpdateResponses = (response: IResponse) => {
      setResponses([...responses, response]);
   };

   const handleOpenResponseForm = () => {
      setShowForm((prev) => !prev);
      setTimeout(() => {
         window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
         });
      }, 0);
   };

   useEffect(() => {
      getRequest();
   }, []);

   return (
      <div className="w-full max-w-[1600px] px-20 mx-auto mt-10 flex flex-col gap-6 scroll-smooth">
         <NavBar />
         {!request && <p className="flex justify-center">Loading...</p>}

         {request && (
            <div className="px-24 py-2 flex flex-col gap-4 mb-20 scroll-smooth">
               <InfoSection request={request} />

               <Separator />

               <ResponseSection request={request} responses={responses} />

               <Separator />

               {showForm ? (
                  <NewResponse
                     onHideForm={() => {
                        setShowForm(false);
                     }}
                     onUpdateResponses={handleUpdateResponses}
                  />
               ) : (
                  request?.status !== "finalizado" && (
                     <div className="flex gap-6 mt-4">
                        <Button onClick={handleOpenResponseForm}>
                           Nova resposta
                        </Button>
                        <FinalizeButton
                           onFinalizeRequest={handleFinalizeRequest}
                        />
                     </div>
                  )
               )}
            </div>
         )}
      </div>
   );
};
