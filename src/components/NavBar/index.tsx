import { CaretLeft } from "phosphor-react"
import { useNavigate } from "react-router-dom"

export const NavBar = () => {
   const navigate = useNavigate()

   return (
      <div className="w-full">
         <button onClick={() => navigate(-1)} className="flex gap-2 items-center justify-center text-base">
            <CaretLeft size={24} />
            Voltar
         </button>
      </div>
   )
}