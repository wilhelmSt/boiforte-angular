import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsTable } from 'src/app/components/products-table/products-table.component';
import { Fornecedor, SearchFornecedor } from 'src/app/interfaces/fornecedor';
import { SearchResponse, TableHeader, TInfo, TInfoList } from 'src/app/interfaces/geral';
import { FornecedorService } from 'src/app/services/fornecedor/fornecedor.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss'],
})
export class FornecedoresComponent {
  titleFornecedores = 'Tabela de Fornecedores';
  headersFornecedores: TableHeader = [
    {
      name: 'Nome/Razão Social',
      reference: 'nome',
    },
    {
      name: 'Endereço',
      reference: 'endereco',
    },
    {
      name: 'Quantidade de lotes',
      reference: 'quantidade_lotes',
    },
    {
      name: 'telefone',
      reference: 'telefone',
    },
    {
      name: 'Última entrada',
      reference: 'ultima_entrada',
    },
  ];

  fornecedores: ProductsTable<Fornecedor> = {
    products: [],
    pages: 0,
    total: 0,
  };
  isLoading: boolean = false;
  searchText: string = '';

  totalFornecedores: TInfo = {
    value: 0,
    title: 'Total de fornecedores',
    color: 'black',
  };

  fornecedoresAtivos: TInfo = {
    value: 0,
    title: 'Total de fornecedores ativos',
    color: 'green',
  };

  info: TInfoList = {
    title: 'Top fornecedores',
    contents: [],
  };

  constructor(
    private router: Router,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit() {
    this.getAllFornecedores();
    this.getTopFornecedores();
    this.getFornecedoresAtivos();
  }

  getAllFornecedores(termo = {}) {
    this.isLoading = true;

    this.fornecedorService.buscar(termo).subscribe({
      next: (res: SearchResponse<Fornecedor>) => {
        this.fornecedores = {
          products: res.data || [],
          total: res.total || 0,
          pages: res.pages || 0,
        };

        this.totalFornecedores.value = res.total;
      },
      error: (error) => console.error('Error ao carregar fornecedores'),
      complete: () => (this.isLoading = false),
    });
  }

  getTopFornecedores() {
    this.fornecedorService.getTopFornecedores().subscribe({
      next: (res) => {
        if (!res?.length) {
          this.info.contents = ['Nenhum fornecedor mais de vendas encontrado'];
        } else {
          this.info.contents = res.map((value) => {
            return value.nome.slice(0, 100);
          });
        }
      },
      error: (error) => console.error('Error ao carregar top fornecedores'),
    });
  }

  getFornecedoresAtivos() {
    this.fornecedorService.getFornecedoresAtivos().subscribe({
      next: (res) => {
        this.fornecedoresAtivos.value = res.fornecedoresAtivos;
      },
      error: (error) => console.error('Error ao carregar fornecedores ativos'),
    });
  }

  filterChange(search: string, page: number) {
    const termo: SearchFornecedor = { q: search, page };
    this.searchText = search;
    this.getAllFornecedores(termo);
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
