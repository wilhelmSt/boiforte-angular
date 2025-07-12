export enum TipoPagamento {
  DINHEIRO = 'DINHEIRO',
  CARTAO = 'CARTAO',
  PIX = 'PIX',
  BOLETO = 'BOLETO',
}

export enum CondicaoPagamento {
  A_VISTA = 'A_VISTA',
  PARCELADO = 'PARCELADO',
}

export enum StatusCompra {
  PAGO = 'PAGO',
  ENTREGUE = 'ENTREGUE',
  CANCELADO = 'CANCELADO',
}

export type ItemCompra = {
  id?: number;
  produtoId: number;
  quantidade: number;
  valorUnitario: number;
  desconto?: number;
};

export type Compra = {
  id: number;
  tipoPagamento: TipoPagamento;
  condicaoPagamento: CondicaoPagamento;
  status: StatusCompra;
  valorTotal: number;
  valorTotalFinal: number;
  desconto: number;
  descontoFinal: number;
  observacao?: string;
  nfeNumero?: string;
  nfeChave?: string;
  createdAt: Date;
  updatedAt: Date;
  clienteId: number;
  cliente?: {
    id: number;
    nome: string;
  };
  itens: ItemCompra[];
};

export type CreateCompraDto = {
  tipoPagamento: TipoPagamento;
  condicaoPagamento: CondicaoPagamento;
  status: StatusCompra;
  valorTotal: number;
  valorTotalFinal: number;
  desconto?: number;
  descontoFinal?: number;
  observacao?: string;
  nfeNumero?: string;
  nfeChave?: string;
  clienteId: number;
  itens: ItemCompra[];
};

export type UpdateCompraDto = {
  tipoPagamento?: TipoPagamento;
  condicaoPagamento?: CondicaoPagamento;
  status?: StatusCompra;
  valorTotal?: number;
  valorTotalFinal?: number;
  desconto?: number;
  descontoFinal?: number;
  observacao?: string;
  nfeNumero?: string;
  nfeChave?: string;
  clienteId?: number;
};
