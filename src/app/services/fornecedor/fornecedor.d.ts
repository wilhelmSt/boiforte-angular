export type Fornecedor = {
  id: number;
  nome: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  observacao?: string;
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
