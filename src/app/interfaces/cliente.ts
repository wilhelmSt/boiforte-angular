export type Cliente = {
  id: number;
  nome: string;
  cpfCnpj?: string;
  telefone?: string;
  email?: string;
  endereco?: string;
  observacao?: string;
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
