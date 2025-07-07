import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

type THeadersTable = {
  name: string;
  reference: string;
};

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent {
  @Input() products: Array<any> = [];
  @Input() title: String = '';
  @Input() headers: Array<THeadersTable> = [];
  @Input() navigateTo?: String = '';
  @Input() actions?: Array<any> = [];
  @Input() openModalRelatorio?: (products: Array<any>) => void;

  constructor(private router: Router) {}

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

  openModal() {
    if (this.openModalRelatorio) {
      this.openModalRelatorio(this.products);
    }
  }

  navigateToPath() {
    if (this.navigateTo) {
      this.router.navigate([this.navigateTo]);
    }
  }
}
