interface IRequestStatus {
   status: string
}

export const RequestStatus = ({ status }: IRequestStatus) => {
   return (
      <div className="flex gap-2 items-center text-base">
         <div
            className={`rounded-full size-4 ${
               status === "finalizado" ? "bg-green-600" : "bg-yellow-500"
            }`}
         />
         {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
   );
};
