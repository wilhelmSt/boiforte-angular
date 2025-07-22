import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { ProductsTable } from 'src/app/components/products-table/products-table.component';
import { SearchResponse, TableHeader, TInfoList } from 'src/app/interfaces/geral';
import { ProdutoRes, ProdutoTable, SearchProduto } from 'src/app/interfaces/produto';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { formatDate } from 'src/app/shared/functions/constants';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  titleProdutos = 'Tabela de Produtos';
  headersProdutos: TableHeader = [
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
      reference: 'estoque',
    },
    {
      name: 'status',
      reference: 'status',
    },
  ];

  produtos: ProductsTable<ProdutoTable> = {
    products: [],
    total: 0,
    pages: 0,
  };
  isLoading: boolean = false;
  searchText: string = '';

  infos: TInfoList[] = [
    {
      title: 'Produtos com estoque baixo',
      contents: [],
    },
    {
      title: 'Produtos em falta',
      contents: [],
    },
  ];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.getAllProdutos();
    this.getInfos();
  }

  getAllProdutos(termo = {}) {
    this.isLoading = true;

    this.produtoService.buscar(termo).subscribe({
      next: (res: SearchResponse<ProdutoRes>) => {
        this.produtos = {
          products:
            res.data.map((d) => ({
              id: d.id,
              status: this.getEstoqueProduto(d.estoque, d.estoqueMinimo),
              estoque: d.estoque,
              preco: d.preco,
              vencimento: formatDate(d.vencimento),
              corte: d.corte?.nome,
              especie: d.corte?.especie?.nome,
            })) || [],
          total: res.total || 0,
          pages: res.pages || 0,
        };
      },
      error: (er) => {
        this.isLoading = false;
        this.toastr.error('Error ao carregar produtos');
        console.error('Error ao carregar produtos', er);
      },
      complete: () => (this.isLoading = false),
    });
  }

  getInfos() {
    this.isLoading = true;

    forkJoin({
      produtosEstoquesMinimos: this.produtoService.findProdutosEstoqueMinimo(),
      produtosEstoquesZerado: this.produtoService.findProdutosEstoqueZerado(),
    }).subscribe({
      next: (res) => {
        if (!res.produtosEstoquesMinimos?.length) {
          this.setNoProdutosEstoqueMinimo();
        } else {
          this.infos[0].contents = res.produtosEstoquesMinimos.map((pem) => {
            return `${pem.corte.especie.nome} - ${pem.corte.nome}`;
          });
        }

        if (!res.produtosEstoquesZerado?.length) {
          this.setNoProdutosEstoqueZerado();
        } else {
          this.infos[1].contents = res.produtosEstoquesZerado.map((pez) => {
            return `${pez.corte.especie.nome} - ${pez.corte.nome}`;
          });
        }

        this.isLoading = false;
      },
      error: (er) => {
        console.error('Error ao carregar produtos infos.');
        this.setNoProdutosEstoqueMinimo();
        this.setNoProdutosEstoqueZerado();
        this.isLoading = false;
      },
    });
  }

  setNoProdutosEstoqueMinimo() {
    this.infos[0].contents = ['Nenhum produto com estoque abaixo do mínimo encontrado.'];
  }

  setNoProdutosEstoqueZerado() {
    this.infos[1].contents = ['Nenhum produto com estoque zerado encontrado.'];
  }

  getEstoqueProduto(estoque: number, estoqueMinimo: number) {
    if (estoque > estoqueMinimo) {
      return 'Alto estoque';
    } else if (estoque === 0) {
      return 'Em falta';
    } else {
      return 'Baixo estoque';
    }
  }

  filterChange(search: string, page: number) {
    const termo: SearchProduto = { q: search, page };
    this.searchText = search;
    this.getAllProdutos(termo);
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
    this.router.navigate(['/cadastro-produto'], {
      queryParams: {
        id: id,
        acao: 'VISUALIZAR',
      },
    });
  };

  edit = (id: number | string) => {
    this.router.navigate(['/cadastro-produto'], {
      queryParams: {
        id: id,
        acao: 'EDITAR',
      },
    });
  };
}
