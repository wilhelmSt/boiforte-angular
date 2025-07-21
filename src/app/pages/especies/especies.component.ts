import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsTable } from 'src/app/components/products-table/products-table.component';
import { SearchEspecie, TEspecie } from 'src/app/interfaces/especie';
import { SearchResponse } from 'src/app/interfaces/geral';
import { EspecieService } from 'src/app/services/especie/especie.service';

@Component({
  selector: 'app-especies',
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.scss'],
})
export class EspeciesComponent implements OnInit {
  titleEspecies = 'Tabela de Espécies | Cortes';
  headersEspecies = [
    {
      name: 'ID Espécie',
      reference: 'idEspecie',
    },
    {
      name: 'Espécie',
      reference: 'nomeEspecie',
    },
    {
      name: 'ID Corte',
      reference: 'idCorte',
    },
    {
      name: 'Corte',
      reference: 'nomeCorte',
    },
  ];

  especies: ProductsTable<TEspecie> = {
    products: [],
    pages: 0,
    total: 0,
  };
  isLoading = false;
  searchText: string = '';

  constructor(
    private router: Router,
    private especieService: EspecieService
  ) {}

  ngOnInit() {
    this.getAllEspecies();
  }

  getAllEspecies(termo = {}) {
    this.isLoading = true;

    this.especieService.buscar(termo).subscribe({
      next: (res: SearchResponse<TEspecie>) => {
        this.especies = {
          products: res.data || [],
          total: res.total || 0,
          pages: res.pages || 0,
        };
      },
      error: (error) => console.error('Error ao carregar espécies'),
      complete: () => (this.isLoading = false),
    });
  }

  filterChange(search: string, page: number) {
    const termo: SearchEspecie = { q: search, page };
    this.searchText = search;
    this.getAllEspecies(termo);
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
