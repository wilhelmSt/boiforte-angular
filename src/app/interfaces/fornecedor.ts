import { TSearch } from './geral';

export type SearchFornecedor = TSearch & {
  orderBy?: 'nome' | 'endereco' | 'telefone' | 'ultima_entrada' | 'quantidade_lotes';
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
