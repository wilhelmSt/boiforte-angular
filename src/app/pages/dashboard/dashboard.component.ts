import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CadastrarModalComponent } from 'src/app/modal/cadastrar-modal/cadastrar-modal.component';
import { RelatorioModalComponent } from 'src/app/modal/relatorio-modal/relatorio-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  pedidos = 90;
  vendasHoje = 23;
  readonly lotes = 'Validade de lotes';
  readonly cortes = 'Estoque de cortes';

  cortesEmFalta = ['Maminha - Gado', 'Peito - Frango', 'Coxa - Frango'];

  title = 'Tabela de cortes';
  headers = [
    {
      name: 'ID Lote',
      reference: 'id',
    },
    {
      name: 'Corte',
      reference: 'corte',
    },
    {
      name: 'Espécies',
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

  constructor(public dialog: MatDialog) {}

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
