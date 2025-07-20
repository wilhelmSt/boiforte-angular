import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

type TCorte = {
  id: number;
  corte: string;
  especie: string;
  vencimento: string;
  quantidade: number;
  status: string;
};

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  titleProdutos = 'Tabela de Produtos';
  headersProdutos = [
    {
      name: 'ID Produto',
      reference: 'id',
    },
    {
      name: 'Corte',
      reference: 'corte',
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
      name: 'status',
      reference: 'status',
    },
  ];
  cortes: Array<TCorte> = [];
  totalProducts = 0;

  infos = [
    {
      title: 'Cortes em falta',
      contents: ['Maminha - Gado', 'Peito - Frango', 'Coxa - Frango'],
    },
    {
      title: 'Cortes com estoque baixo',
      contents: ['Maminha - Gado', 'Peito - Frango', 'Coxa - Frango'],
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.getAllCortes();
  }

  getAllCortes() {
    this.cortes = [
      {
        id: 1,
        corte: 'Picanha',
        especie: 'Bovino',
        vencimento: '2023-12-15',
        quantidade: 150,
        status: 'Alto estoque',
      },
      {
        id: 2,
        corte: 'Contrafilé',
        especie: 'Bovino',
        vencimento: '2023-12-05',
        quantidade: 80,
        status: 'Médio estoque',
      },
      {
        id: 3,
        corte: 'Asa de frango',
        especie: 'Frango',
        vencimento: '2023-11-28',
        quantidade: 200,
        status: 'Alto estoque',
      },
      {
        id: 4,
        corte: 'Linguiça',
        especie: 'Suíno',
        vencimento: '2023-11-20',
        quantidade: 30,
        status: 'Baixo estoque',
      },
      {
        id: 5,
        corte: 'Costela',
        especie: 'Bovino',
        vencimento: '2023-11-15',
        quantidade: 10,
        status: 'Em falta',
      },
      {
        id: 6,
        corte: 'Peito de frango',
        especie: 'Frango',
        vencimento: '2023-12-10',
        quantidade: 5,
        status: 'Baixo estoque',
      },
      {
        id: 7,
        corte: 'Bisteca',
        especie: 'Suíno',
        vencimento: '2023-12-20',
        quantidade: 0,
        status: 'Em falta',
      },
      {
        id: 8,
        corte: 'Alcatra',
        especie: 'Bovino',
        vencimento: '2023-12-08',
        quantidade: 45,
        status: 'Médio estoque',
      },
      {
        id: 9,
        corte: 'Coxa de frango',
        especie: 'Frango',
        vencimento: '2023-12-12',
        quantidade: 120,
        status: 'Alto estoque',
      },
      {
        id: 10,
        corte: 'Pernil',
        especie: 'Suíno',
        vencimento: '2023-11-30',
        quantidade: 25,
        status: 'Baixo estoque',
      },
    ];
    this.totalProducts = this.cortes.length;
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
