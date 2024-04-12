export const requestTypes = [
   "Acesso e senhas",
   "Apressamento de disciplina",
   "Assinaturas",
   "Cancelamento",
   "Carteirinha Fatec",
   "Comprovante de matricula",
   "Conteúdos programáticos",
   "Desitência de disciplinas",
   "Histórico Escolar",
   "Informações",
   "Modelos de Contratos",
   "Trancamento",
]

export const translatedRequestTypes = {
   access: "Acesso e senhas",
   disciplineRush: "Apressamento de disciplina",
   signature: "Assinaturas",
   cancellation: "Cancelamento",
   fatecCard: "Carteirinha Fatec",
   registrationProof: "Comprovante de matricula",
   programContent: "Conteúdos programáticos",
   abandoningSubjects: "Desitência de disciplinas",
   schoolRecords: "Histórico Escolar",
   information: "Informações",
   contractTemplates: "Modelos de Contratos",
   lockout: "Trancamento",
}

export interface IRequest {
   id: string;
   status: string;
   tipo_pedidoId: number;
   descricao: string;
   criado_em: string;
   encerrado_em?: string;
   atualizado_em: string;
   alunoId: string;
   Aluno: {
      curso: string;
      nome: string;
      ra: string;
   };
   tipo_pedido: {
      tipo: string;
   };
   Resposta: {
      id: string
      descricao: string;
      criado_em: string;
      criado_por: string;
      cargo: string;
   }[]
}