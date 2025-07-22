import * as dayjs from 'dayjs';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ProductsTable } from 'src/app/components/products-table/products-table.component';
import { Lote } from 'src/app/interfaces/lote';
import { CadastrarModalComponent } from 'src/app/modal/cadastrar-modal/cadastrar-modal.component';
import { RelatorioModalComponent } from 'src/app/modal/relatorio-modal/relatorio-modal.component';
import { LoteService } from 'src/app/services/lote/lote.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import { Produto } from 'src/app/interfaces/produto';
import { CompraService } from 'src/app/services/compra/compra.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  pedidos = 0;
  vendasHoje = 0;
  readonly lotesValidade = 'Validade de lotes';
  readonly cortesEstoque = 'Estoque de cortes';

  cortesEmFalta: String[] = [];

  title = 'Tabela de cortes';
  headers = [
    {
      name: 'ID Lote',
      reference: 'id',
    },
    {
      name: 'Corte',
      reference: 'nomeCorte',
    },
    {
      name: 'Espécies',
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
      name: 'Status',
      reference: 'status',
    },
  ];

  validadeLotes = [
    { id: '001', corte: 'Maminha', especie: 'Gado', vencimento: '2023-12-01', quantidade: 150, status: 'Vencido' },
    {
      id: '002',
      corte: 'Picanha',
      especie: 'Gado',
      vencimento: '2023-11-15',
      quantidade: 20,
      status: 'Perto de vencer',
    },
    {
      id: '003',
      corte: 'Peito',
      especie: 'Frango',
      vencimento: '2023-12-20',
      quantidade: 60,
      status: 'Perto de vencer',
    },
    { id: '004', corte: 'Moela', especie: 'Porco', vencimento: '2024-01-05', quantidade: 200, status: 'Vencido' },
  ];

  estoqueCortes = [
    { id: '001', corte: 'Maminha', especie: 'Gado', vencimento: '2023-12-01', quantidade: 150, status: 'Alto estoque' },
    { id: '002', corte: 'Picanha', especie: 'Gado', vencimento: '2023-11-15', quantidade: 20, status: 'Baixo estoque' },
    { id: '003', corte: 'Peito', especie: 'Frango', vencimento: '2023-12-20', quantidade: 60, status: 'Médio estoque' },
    { id: '004', corte: 'Moela', especie: 'Porco', vencimento: '2024-01-05', quantidade: 0, status: 'Em falta' },
  ];

  isLoading: boolean = false;
  cortes: ProductsTable<Produto> = {
    products: [],
    total: 0,
    pages: 0,
  };
  lotes: ProductsTable<Lote> = {
    products: [],
    total: 0,
    pages: 0,
  };
  totalLotesProducts = 0;

  constructor(
    public dialog: MatDialog,
    private produtoService: ProdutoService,
    private loteService: LoteService,
    private compraService: CompraService
  ) {
    this.getInfo();
  }

  getInfo(): void {
    this.isLoading = true;

    forkJoin({
      pedidos: this.compraService.contarTodos(),
      pedidosDoDia: this.compraService.contarTodosDoDia(),
      produtos: this.produtoService.buscar(),
      cortes: this.produtoService.findProdutosEstoqueZerado(),
      lotes: this.loteService.buscar(),
    }).subscribe({
      next: (res) => {
        this.pedidos = res.pedidos || 0;
        this.vendasHoje = res.pedidosDoDia || 0;

        if (res.cortes.length) {
          this.cortesEmFalta =
            res.cortes.map((prod) => `${prod.corte?.nome || ''} - ${prod.corte?.especie?.nome || ''}`) || [];
        } else {
          this.setNoProdutosEstoqueZerado();
        }

        this.lotes = {
          products:
            res.lotes.data.map((el: any) => {
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
          total: res.lotes.total || 0,
          pages: res.lotes.pages || 0,
        };
        this.totalLotesProducts = res.lotes.total;

        this.cortes = {
          products:
            res.produtos.data.map((el: any) => {
              const estoque = el.estoque;

              let status = 'Alto estoque';

              if (estoque <= 0) {
                status = 'Em falta';
              } else if (estoque <= 10) {
                status = 'Baixo estoque';
              } else if (estoque <= 100) {
                status = 'Médio estoque';
              }

              return {
                ...el,
                nomeCorte: el.corte?.nome || '',
                nomeEspecie: el.corte?.especie?.nome || '',
                vencimento: dayjs(el.vencimento).format('DD/MM/YYYY'),
                quantidade: estoque,
                status,
              };
            }) || [],
          total: res.produtos.total || 0,
          pages: res.produtos.pages || 0,
        };

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
        this.isLoading = false;
      },
    });
  }

  setNoProdutosEstoqueZerado() {
    this.cortesEmFalta = ['Nenhum corte em falta encontrado.'];
  }

  openModalRelatorio(products: Array<any>) {
    const id = 'modal-relatorio';
    const opened = this.dialog.getDialogById(id);

    if (!opened) {
      this.dialog.open(RelatorioModalComponent, {
        id,
        width: '370px',
        height: 'auto',
        maxWidth: '1000px',
        panelClass: 'relatorio-modal',
        closeOnNavigation: true,
        data: { products },
      });
    }
  }

  openModalCadastrar() {
    const id = 'modal-cadastrar';
    const opened = this.dialog.getDialogById(id);

    if (!opened) {
      this.dialog.open(CadastrarModalComponent, {
        id,
        width: '1100px',
        height: 'auto',
        panelClass: 'relatorio-modal',
        closeOnNavigation: true,
      });
    }
  }
}
