import { TSearch } from './geral';

export type SearchCliente = TSearch & {
  orderBy?: 'nome' | 'endereco' | 'telefone' | 'quantidade_pedidos' | 'ultimo_pedido';
};

export type Cliente = {
  id: number;
  nome: string;
  cpfCnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  observacao?: string;
  quantidade_pedidos?: number | string;
  ultimo_pedido?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CreateClienteDto = {
  nome: string;
  cpfCnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  observacao?: string;
};

export type UpdateClienteDto = {
  nome?: string;
  cpfCnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  observacao?: string;
};
