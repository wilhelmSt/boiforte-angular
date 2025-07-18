import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsTable } from 'src/app/components/products-table/products-table.component';
import { Cliente, SearchCliente } from 'src/app/interfaces/cliente';
import { SearchResponse, TableHeader, TInfo, TInfoList } from 'src/app/interfaces/geral';
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {
  titleClientes = 'Tabela de Clientes';
  headersClientes: TableHeader = [
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
      reference: 'quantidade_pedidos',
    },
    {
      name: 'telefone',
      reference: 'telefone',
    },
    {
      name: 'Último pedido',
      reference: 'ultimo_pedido',
    },
  ];

  clientes: ProductsTable<Cliente> | null = null;
  isLoading = false;
  searchText: string = '';

  totalClientes: TInfo = {
    value: 0,
    title: 'Total de clientes',
    color: 'black',
  };

  clientesAtivos: TInfo = {
    value: 0,
    title: 'Total de clientes ativos',
    color: 'green',
  };

  info: TInfoList = {
    title: 'Top clientes',
    contents: ['Carlos', 'João Frango', 'Zézin'],
  };

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.getAllClientes();
    this.getTopClientes();
    this.getClientesAtivos();
  }

  getAllClientes(termo = {}) {
    this.isLoading = true;

    this.clienteService.buscar(termo).subscribe({
      next: (res: SearchResponse<Cliente>) => {
        this.clientes = {
          products: res.data || [],
          total: res.total || 0,
          pages: res.pages || 0,
        };

        this.totalClientes.value = res.total;
      },
      error: (error) => console.error('Error ao carregar clientes'),
      complete: () => (this.isLoading = false),
    });
  }

  getTopClientes() {
    this.clienteService.getTopClientes().subscribe({
      next: (res) => {
        this.info.contents = res.map((value) => {
          return value.nome.slice(0, 100);
        });
      },
      error: (error) => console.error('Error ao carregar top clientes'),
    });
  }

  getClientesAtivos() {
    this.clienteService.getClientesAtivos().subscribe({
      next: (res) => {
        this.clientesAtivos.value = res.clientesAtivos;
      },
      error: (error) => console.error('Error ao carregar clientes ativos'),
    });
  }

  filterChange(search: string, page: number) {
    const termo: SearchCliente = { q: search, page };
    this.searchText = search;
    this.getAllClientes(termo);
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
