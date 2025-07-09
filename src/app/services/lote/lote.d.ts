export type Lote = {
  id: number;
  quantidade: number;
  custoUnitario: number;
  custoTotal: number;
  vencimento: Date;
  createdAt: Date;
  updatedAt: Date;
  produtoId: number;
  fornecedorId: number;
  produto?: {
    id: number;
    nome: string;
  };
  fornecedor?: {
    id: number;
    nome: string;
  };
};

export type CreateLoteDto = {
  produtoId: number;
  fornecedorId: number;
  quantidade?: number;
  custoUnitario: number;
  custoTotal: number;
  vencimento: Date | string;
};

export type UpdateLoteDto = {
  produtoId?: number;
  fornecedorId?: number;
  quantidade?: number;
  custoUnitario?: number;
  custoTotal?: number;
  vencimento?: Date | string;
};
