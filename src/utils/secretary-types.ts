export interface ISecretary {
   id: string;
   nome: string;
   email: string;
   numeroMatricula: string;
   cargo: string;
   tipo_pedido_secretario?: {
      tipo_pedido: {
         tipo: string;
      };
   }[];
}