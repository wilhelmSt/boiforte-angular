import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

type TEspecie = {
  id: number;
  especie: string;
  total_cortes: number;
};

@Component({
  selector: 'app-especies',
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.scss'],
})
export class EspeciesComponent implements OnInit {
  titleEspecies = 'Tabela de espécies';
  headersEspecies = [
    {
      name: 'ID Espécie',
      reference: 'id',
    },
    {
      name: 'Espécie',
      reference: 'especie',
    },
    {
      name: 'total de cortes',
      reference: 'total_cortes',
    },
  ];
  especies: Array<TEspecie> = [];
  totalProducts = 3;

  constructor(private router: Router) {}

  ngOnInit() {
    this.getAllEspecies();
  }

  getAllEspecies() {
    this.especies = [
      {
        id: 20,
        especie: 'gado',
        total_cortes: 205,
      },
      {
        id: 21,
        especie: 'porco',
        total_cortes: 505,
      },
      {
        id: 22,
        especie: 'frango',
        total_cortes: 105,
      },
    ];
  }

  filterChange(search: string, page: number) {
    console.log(search, page);
  }

  voltar() {
    this.router.navigate(['/dashboard']);
  }
}
