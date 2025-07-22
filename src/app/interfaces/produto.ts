import { TSearch } from './geral';

export type SearchProduto = TSearch & {
  orderBy?: 'corte' | 'especie' | 'estoque' | 'vencimento';
};

export type Produto = {
  id: number;
  codigo?: string;
  descricao?: string;
  precoPadrao: number;
  estoqueMinimo: number;
  estoque: number;
  unidadeMedida: string;
  promocao: boolean;
  precoPromocional?: number;
  descontoAtacado: boolean;
  precoAtacado?: number;
  quantidadeAtacado?: number;
  imagem?: string;
  vencimento?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  corteId: number;
  corte?: {
    id: number;
    nome: string;
    especie?: {
      id: number;
      nome: string;
    };
  };
};

export type ProdutoRes = {
  id: number;
  estoque: number;
  estoqueMinimo: number;
  preco: number;
  vencimento: Date | string;
  corte: {
    id: number;
    nome: string;
    especie: {
      id: number;
      nome: string;
    };
  };
};

export type ProdutoTable = {
  id: number;
  status: string;
  estoque: number;
  preco: number | string;
  vencimento: Date | string;
  corte: string;
  especie: string;
};

export type CreateProdutoDto = {
  codigo?: string;
  descricao?: string;
  precoPadrao: number;
  estoqueMinimo?: number;
  promocao?: boolean;
  precoPromocional?: number;
  descontoAtacado?: boolean;
  precoAtacado?: number;
  quantidadeAtacado?: number;
  imagem?: string;
  corteId: number;
};

export type UpdateProdutoDto = {
  descricao?: string;
  precoPadrao?: number;
  estoqueMinimo?: number;
  estoque?: number;
  unidadeMedida?: string;
  promocao?: boolean;
  precoPromocional?: number;
  descontoAtacado?: boolean;
  precoAtacado?: number;
  quantidadeAtacado?: number;
  imagem?: string;
  corteId?: number;
};
