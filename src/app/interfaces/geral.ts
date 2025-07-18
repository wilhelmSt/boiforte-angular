export type TSearch = {
  q?: string;
  page?: number;
  limit?: number;
  orderDirection?: 'ASC' | 'DESC';
};

export type SearchResponse<T> = {
  data: Array<T>;
  total: number;
  pages: number;
};

export type TInfo = {
  value: number;
  title: string;
  color: 'green' | 'black' | 'red';
};

export type TInfoList = {
  title: string;
  contents: Array<string>;
};

export type TableHeader = Array<{ name: string; reference: string }>;
