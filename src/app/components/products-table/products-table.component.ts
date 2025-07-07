import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

type THeadersTable = {
  name: string;
  reference: string;
};

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent implements OnInit, OnDestroy {
  @Input() products: Array<any> = [];
  @Input() title: String = '';
  @Input() headers: Array<THeadersTable> = [];
  @Input() totalProducts: number = 0;
  @Input() navigateTo?: String = '';
  @Input() actions?: Array<any> = [];
  @Input() searchAvaliable?: boolean = false;
  @Input() openModalRelatorio?: (products: Array<any>) => void;
  @Input() filterChange?: (search: string, page: number) => void;

  searchText = '';
  currentPage = 1;
  itemsPerPage = 10;

  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  ngOnInit() {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(1.5 * 1000), distinctUntilChanged())
      .subscribe((searchText) => {
        this.currentPage = 1;

        if (this.filterChange) {
          this.filterChange(searchText, this.currentPage);
        }
      });
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe();
  }

  constructor(private router: Router) {}

  get totalPages(): number {
    return Math.ceil(this.totalProducts / this.itemsPerPage);
  }

  get pages(): number[] {
    const pages = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  get visibleProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onSearchInputChange(searchText: string) {
    this.searchText = searchText;
    this.searchSubject.next(searchText);
  }

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

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;

      if (this.filterChange) {
        this.filterChange(this.searchText, this.currentPage);
      }
    }
  }

  navigateToPath() {
    if (this.navigateTo) {
      this.router.navigate([this.navigateTo]);
    }
  }
}
