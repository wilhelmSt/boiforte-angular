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
