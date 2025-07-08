import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  pedidos: Array<TPedido> = [];
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

  constructor(private router: Router) {}

  ngOnInit() {
    this.getAllPedidos();
  }

  getAllPedidos() {
    this.pedidos = [];
    this.totalProducts = this.pedidos.length;
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
