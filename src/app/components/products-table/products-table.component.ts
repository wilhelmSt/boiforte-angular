import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

type THeadersTable = {
  name: string;
  reference: string;
};

interface BaseProduct {
  id?: number | string;
  status?: string;
  [key: string]: any;
}

export type ProductsTable<T extends BaseProduct = BaseProduct> = {
  products: Array<T>;
  total: number;
  pages: number;
};

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
})
export class ProductsTableComponent<T extends BaseProduct> implements OnInit, OnDestroy {
  @Input() products!: ProductsTable<T>;
  @Input() title: String = '';
  @Input() headers: Array<THeadersTable> = [];
  @Input() navigateTo?: String = '';
  @Input() actions?: Array<any> = [];
  @Input() searchAvaliable?: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() openModalRelatorio?: (products: Array<any>) => void;
  @Input() filterChange?: (search: string, page: number) => void;

  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>();

  currentPage = 1;
  itemsPerPage = 10;

  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  ngOnInit() {
    this.setupSearchSubscription();
  }

  ngOnDestroy() {
    this.cleanupSubscriptions();
  }

  constructor(private router: Router) {}

  private setupSearchSubscription() {
    this.searchSubscription = this.searchSubject
      .pipe(debounceTime(800), distinctUntilChanged())
      .subscribe((searchText) => {
        this.handleSearch(searchText);
      });
  }

  private cleanupSubscriptions(): void {
    this.searchSubscription?.unsubscribe();
    this.searchSubject.complete();
  }

  private handleSearch(searchText: string) {
    this.currentPage = 1;
    this.searchText = searchText;
    this.searchTextChange.emit(searchText);

    if (this.filterChange) {
      this.filterChange(searchText, this.currentPage);
    }
  }

  onSearchInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchText = value;
    this.searchTextChange.emit(value);
    this.searchSubject.next(value);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.products.total && page !== this.currentPage) {
      this.currentPage = page;

      if (this.filterChange) {
        this.filterChange(this.searchText, this.currentPage);
      }
    }
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

  get pages(): number[] {
    const pages = [];

    for (let i = 1; i <= this.products.pages; i++) {
      pages.push(i);
    }

    return pages;
  }

  get visibleProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    return this.products.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  openModal() {
    if (this.openModalRelatorio) {
      this.openModalRelatorio(this.products.products);
    }
  }

  navigateToPath() {
    if (this.navigateTo) {
      this.router.navigate([this.navigateTo]);
    }
  }
}
