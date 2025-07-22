import * as dayjs from 'dayjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsTable } from 'src/app/components/products-table/products-table.component';
import { Compra } from 'src/app/interfaces/compra';
import { SearchResponse, TSearch } from 'src/app/interfaces/geral';
import { CompraService } from 'src/app/services/compra/compra.service';

export type SearchCompra = TSearch & {
  orderBy?: 'nome' | 'tipoPagamento' | 'status' | 'observacao';
};

type TPedido = {
  nome: string;
  endereco: string;
  qntd_lotes: number;
  telefone: string;
  ultima_entrada: string;
};

type TPedidoInfo = {
  value: number;
  title: string;
  color: 'green' | 'black' | 'red';
};

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
})
export class PedidosComponent {
  titlePedidos = 'Tabela de Pedidos';
  headersPedidos = [
    {
      name: 'ID Pedido',
      reference: 'id',
    },
    {
      name: 'Cliente',
      reference: 'cliente',
    },
    {
      name: 'Data pedido',
      reference: 'data_pedido',
    },
    {
      name: 'Quantidade (kg)',
      reference: 'quantidade',
    },
    {
      name: 'Valor do pedido',
      reference: 'valor_pedido',
    },
    {
      name: 'Status',
      reference: 'status',
    },
  ];
  totalProducts = 0;

  totalPedidos: TPedidoInfo = {
    value: 190,
    title: 'Pedidos nos últimos 30 dias',
    color: 'black',
  };

  infoPedido = {
    title: 'Pedidos pendentes por ID',
    contents: ['100', '101', '102'],
  };

  infoCliente = {
    title: 'Top clientes',
    contents: ['Carlos', 'João Frango', 'Zézin'],
  };

  isLoading: boolean = false;
  compras: ProductsTable<Compra> = {
    products: [],
    total: 0,
    pages: 0,
  };
  searchText: string = '';

  constructor(
    private router: Router,
    private compraService: CompraService
  ) {}

  ngOnInit() {
    this.getAllPedidos();
  }

  getAllPedidos(termo = {}) {
    this.isLoading = true;

    this.compraService.buscar(termo).subscribe({
      next: (res: SearchResponse<Compra>) => {
        this.compras = {
          products:
            res.data.map((el: any) => {
              return {
                ...el,
              };
            }) || [],
          total: res.total || 0,
          pages: res.pages || 0,
        };

        this.totalProducts = res.total;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error ao carregar compras: ', err);
        this.isLoading = false;
      },
    });
  }

  filterChange(search: string, page: number) {
    const termo: SearchCompra = { q: search, page };
    this.searchText = search;
    this.getAllPedidos(termo);
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

  see = (id: number | string) => {
    this.router.navigate(['/cadastro-compra'], {
      queryParams: {
        id: id,
        acao: 'VISUALIZAR',
      },
    });
  };

  // edit = (id: number | string) => {
  //   this.router.navigate(['/cadastro-compra'], {
  //     queryParams: {
  //       id: id,
  //       acao: 'EDITAR',
  //     },
  //   });
  // };
}
