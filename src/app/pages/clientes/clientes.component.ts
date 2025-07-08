import { Component } from '@angular/core';
import { Router } from '@angular/router';

type TCliente = {
  nome: string;
  endereco: string;
  qntd_lotes: number;
  telefone: string;
  ultima_entrada: string;
};

type TClienteInfo = {
  value: number;
  title: string;
  color: 'green' | 'black' | 'red';
};

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {
  titleClientes = 'Tabela de Clientes';
  headersClientes = [
    {
      name: 'Nome/Razão Social',
      reference: 'nome',
    },
    {
      name: 'Endereço',
      reference: 'endereco',
    },
    {
      name: 'Pedidos totais',
      reference: 'qntd_pedidos',
    },
    {
      name: 'telefone',
      reference: 'telefone',
    },
    {
      name: 'Última pedido',
      reference: 'ultima_pedido',
    },
  ];
  clientes: Array<TCliente> = [];
  totalProducts = 0;

  totalClientes: TClienteInfo = {
    value: 190,
    title: 'Total de clientes',
    color: 'black',
  };

  clientesAtivos: TClienteInfo = {
    value: 35,
    title: 'Total de clientes ativos',
    color: 'green',
  };

  info = {
    title: 'Top clientes',
    contents: ['Carlos', 'João Frango', 'Zézin'],
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.getAllClientes();
  }

  getAllClientes() {
    this.clientes = [];
    this.totalProducts = this.clientes.length;
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
