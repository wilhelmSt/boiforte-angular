export type SearchFornecedorResponse = {
  data: Array<Fornecedor>;
  total: number;
  pages: number;
};

export type SearchFornecedor = {
  q?: string;
  page?: number;
  limit?: number;
  orderBy?: 'nome' | 'endereco' | 'telefone' | 'ultima_entrada' | 'quantidade_lotes';
  orderDirection?: 'ASC' | 'DESC';
};

export type Fornecedor = {
  id: number;
  nome: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  observacao?: string;
  quantidade_lotes?: number | string;
  ultima_entrada?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CreateFornecedorDto = {
  nome: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  observacao?: string;
};

export type UpdateFornecedorDto = {
  nome?: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  observacao?: string;
};
