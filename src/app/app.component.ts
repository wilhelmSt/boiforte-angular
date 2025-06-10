import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  pedidos = 90;
  vendasHoje = 23;

  cortesEmFalta = [
    { corte: 'Maminha', especie: 'Gado' },
    { corte: 'Peito', especie: 'Frango' },
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

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Vencido: 'badge-red',
      'Perto de vencer': 'badge-yellow',
      'Alto estoque': 'badge-green',
      'Médio estoque': 'badge-yellow',
      'Baixo estoque': 'badge-red',
      'Em falta': 'badge-dark-red',
    };
    return map[status] || '';
  }
}
