export interface IResponse {
   id: string;
   descricao: string;
   criado_em: string;
   criado_por: string;
   solicitacaoId: string;
   cargo: string;
   secretarioId?: string;
   alunoId?: string;
   arquivo: {
      nome: string
      responseId: string
      url: string
      tamanho: number
      extensao: string
   }[]
}