export interface Produto {
  id: number;
  nome: string;
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
  createdAt: Date;
  updatedAt: Date;
  categoriaId: number;
  categoria?: {
    id: number;
    nome: string;
  };
}

export interface CreateProdutoDto {
  nome: string;
  codigo?: string;
  descricao?: string;
  precoPadrao: number;
  estoqueMinimo?: number;
  estoque?: number;
  unidadeMedida?: string;
  promocao?: boolean;
  precoPromocional?: number;
  descontoAtacado?: boolean;
  precoAtacado?: number;
  quantidadeAtacado?: number;
  imagem?: string;
  categoriaId: number;
}

export interface UpdateProdutoDto {
  nome?: string;
  codigo?: string;
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
  categoriaId?: number;
}
