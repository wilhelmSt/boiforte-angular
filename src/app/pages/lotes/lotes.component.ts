import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoteService } from 'src/app/services/lote/lote.service';

type TLote = {};

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
      name: 'ID Corte',
      reference: 'id',
    },
    {
      name: 'Espécie',
      reference: 'especie',
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
      reference: 'fornecedor',
    },
    {
      name: 'status',
      reference: 'status',
    },
  ];
  lotes: Array<TLote> = [];
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

  getAllLotes() {
    this.lotes = [];
    this.totalProducts = this.lotes.length;
  }

  filterChange(search: string, page: number) {
    console.log(search, page);
  }

  voltar() {
    this.navigateToPath('/dashboard');
  }

  navigateToPath(path: string) {
    this.router.navigate([path]);
  }
}
