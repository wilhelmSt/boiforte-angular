import { TSearch } from './geral';

export type SearchEspecie = TSearch & {
  orderBy?: 'idEspecie' | 'nomeEspecie' | 'idCorte' | 'nomeCorte';
};

export type TEspecie = {
  idEspecie: number | string;
  nomeEspecie: string;
  idCorte: number | string;
  nomeCorte: string;
};

export type EspecieCorte = Categoria & {
  corteProduto: Categoria[];
};

export type Categoria = {
  id: number;
  nome: string;
  descricao: string;
};
