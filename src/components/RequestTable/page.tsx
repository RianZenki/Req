import { Request, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Request[]> {
   // Fetch data from your API here.
   return [
      {
         id: "728ed52f",
         type: "Comprovante de estudante",
         requester: "Jacinto Pinto",
         createdAt: new Date().toISOString(),
         status: "in progress",
      },
      {
         id: "728ed52a",
         type: "Comprovante de estudante",
         requester: "Thomar Turbando",
         createdAt: new Date().toISOString(),
         status: "in progress",
      },
      {
         id: "728ed52b",
         type: "Comprovante de estudante",
         requester: "Paula Tejando",
         createdAt: new Date().toISOString(),
         status: "success",
      },
   ];
}

export default async function DemoPage() {
   const data = await getData();

   return (
      <div className="container mx-auto py-10">
         <DataTable columns={columns} data={data} />
      </div>
   );
}
