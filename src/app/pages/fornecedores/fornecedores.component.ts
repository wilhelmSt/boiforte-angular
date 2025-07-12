import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/interfaces/fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor/fornecedor.service';

type TFornecedorInfo = {
  value: number;
  title: string;
  color: 'green' | 'black' | 'red';
};

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss'],
})
export class FornecedoresComponent {
  titleFornecedores = 'Tabela de Fornecedores';
  headersFornecedores = [
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
      reference: 'qntd_lotes',
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
  fornecedores: Array<Fornecedor> = [];
  totalProducts = 0;

  totalFornecedores: TFornecedorInfo = {
    value: 0,
    title: 'Total de fornecedores',
    color: 'black',
  };

  fornecedoresAtivos: TFornecedorInfo = {
    value: 0,
    title: 'Total de fornecedores ativos',
    color: 'green',
  };

  info = {
    title: 'Top fornecedores',
    contents: [],
  };

  constructor(
    private router: Router,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit() {
    this.getAllFornecedores();
  }

  getAllFornecedores() {
    this.fornecedorService.listarTodos().subscribe({
      next: (data) => {
        this.fornecedores = data;
        this.totalProducts = this.fornecedores.length;
      },
      error: (error) => console.error('Error ao carregar fornecedores'),
    });
  }

  filterChange(search: string, page: number) {
    console.log(search, page);
  }

  voltar() {
    this.navigateToPath('/dashboard');
  }

  navigateToPath(path: string) {
    this.router.navigate([path]);
  }
}
