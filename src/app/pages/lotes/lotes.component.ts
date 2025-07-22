import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import { ProductsTable } from 'src/app/components/products-table/products-table.component';
import { SearchResponse } from 'src/app/interfaces/geral';
import { Lote, SearchLote } from 'src/app/interfaces/lote';
import { LoteService } from 'src/app/services/lote/lote.service';

interface Info {
  title: string;
  contents: string[];
}

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.component.html',
  styleUrls: ['./lotes.component.scss'],
})
export class LotesComponent {
  titleLotes = 'Tabela de Lotes';
  headersLotes = [
    {
      name: 'Corte',
      reference: 'nomeCorte',
    },
    {
      name: 'Espécie',
      reference: 'nomeEspecie',
    },
    {
      name: 'Vencimento',
      reference: 'vencimento',
    },
    {
      name: 'Quantidade (kg)',
      reference: 'quantidade',
    },
    {
      name: 'Fornecedor',
      reference: 'nomeFornecedor',
    },
    {
      name: 'status',
      reference: 'status',
    },
  ];
  isLoading: boolean = false;
  lotes: ProductsTable<Lote> = {
    products: [],
    total: 0,
    pages: 0,
  };
  searchText: string = '';
  totalProducts = 0;

  infos: Info[] = [
    {
      title: 'Lotes vencidos por ID',
      contents: [],
    },
    {
      title: 'Lotes perto do vencimento por ID',
      contents: [],
    },
  ];

  constructor(
    private router: Router,
    private loteService: LoteService
  ) {}

  ngOnInit() {
    this.getAllLotes();
    this.getTopVencidos();
    this.getTopQuaseVencidos();
  }

  toThreeDigit(value: number | string): number | string {
    const num = Number(value);

    if (isNaN(num)) {
      return value;
    }

    return num.toString().padStart(3, '0');
  }

  getLoteName(lote: any): string {
    return `${this.toThreeDigit(lote.id)} - ${lote.produto?.corte?.nome || ''} - ${lote.produto?.corte?.especieProduto?.nome || ''}`;
  }

  setNoTopVencidos() {
    this.infos[0].contents = ['Nenhum lote vencido encontrado!'];
  }

  getTopVencidos() {
    this.loteService.listarTopVencidos().subscribe({
      next: (res) => {
        if (!res?.length) {
          this.setNoTopVencidos();
          return;
        }

        this.infos[0].contents = res.map((value: any) => {
          return this.getLoteName(value);
        });
      },
      error: (error) => {
        console.error('Error ao carregar top vencidos');
        this.setNoTopVencidos();
      },
    });
  }

  setNoTopQuaseVencidos() {
    this.infos[1].contents = ['Nenhum lote perto do vencimento encontrado!'];
  }

  getTopQuaseVencidos() {
    this.loteService.listarTopQuaseVencidos().subscribe({
      next: (res) => {
        if (!res?.length) {
          this.setNoTopQuaseVencidos();
          return;
        }

        this.infos[1].contents = res.map((value: any) => {
          return this.getLoteName(value);
        });
      },
      error: (error) => {
        console.error('Error ao carregar top vencidos');
        this.setNoTopQuaseVencidos();
      },
    });
  }

  see = (id: number | string) => {
    this.router.navigate(['/cadastro-lote'], {
      queryParams: {
        id: id,
        acao: 'VISUALIZAR',
      },
    });
  };

  edit = (id: number | string) => {
    this.router.navigate(['/cadastro-lote'], {
      queryParams: {
        id: id,
        acao: 'EDITAR',
      },
    });
  };

  getAllLotes(termo = {}) {
    this.isLoading = true;

    this.loteService.buscar(termo).subscribe({
      next: (res: SearchResponse<Lote>) => {
        this.lotes = {
          products:
            res.data.map((el: any) => {
              const vencimento = dayjs(el.vencimento);
              const hoje = dayjs();
              let status = '';

              if (vencimento.isBefore(hoje, 'day')) {
                status = 'Vencido';
              } else if (vencimento.isBefore(hoje.add(2, 'month'), 'day')) {
                status = 'Perto de vencer';
              } else {
                status = 'Em validade';
              }

              return {
                ...el,
                nomeCorte: el.produto?.corte?.nome || '',
                nomeEspecie: el.produto?.corte?.especieProduto?.nome || '',
                nomeFornecedor: el.fornecedor?.nome || '',
                vencimento: vencimento.format('DD/MM/YYYY'),
                status,
              };
            }) || [],
          total: res.total || 0,
          pages: res.pages || 0,
        };

        this.totalProducts = res.total;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error ao carregar lotes: ', err);
        this.isLoading = false;
      },
    });
  }

  filterChange(search: string, page: number) {
    const termo: SearchLote = { q: search, page };
    this.searchText = search;
    this.getAllLotes(termo);
  }

  onSearchTextChange(newSearchText: string) {
    this.searchText = newSearchText;
    this.filterChange(newSearchText, 1);
  }

  voltar() {
    this.navigateToPath('/dashboard');
  }

  navigateToPath(path: string) {
    this.router.navigate([path]);
  }
}
