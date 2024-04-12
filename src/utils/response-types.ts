export interface IResponse {
   id: string;
   descricao: string;
   criado_em: string;
   criado_por: string;
   solicitacaoId: string;
   cargo: string;
   secretarioId?: string;
   alunoId?: string;
}