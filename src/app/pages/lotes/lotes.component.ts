import { Component } from '@angular/core';
import { Router } from '@angular/router';

type TLote = {};

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

  infos = [
    {
      title: 'Lotes vencidos por ID',
      contents: ['001 - Maminha - Gado', '123 - Peito - Frango', '142 - Coxa - Frango'],
    },
    {
      title: 'Lotes perto do vencimento por ID',
      contents: ['001 - Maminha - Gado', '123 - Peito - Frango', '142 - Coxa - Frango'],
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.getAllLotes();
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
