import { Component } from '@angular/core';
import { Router } from '@angular/router';

type TFornecedor = {
  nome: string;
  endereco: string;
  qntd_lotes: number;
  telefone: string;
  ultima_entrada: string;
};

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
  fornecedores: Array<TFornecedor> = [];
  totalProducts = 0;

  totalFornecedores: TFornecedorInfo = {
    value: 190,
    title: 'Total de fornecedores',
    color: 'black',
  };

  fornecedoresAtivos: TFornecedorInfo = {
    value: 35,
    title: 'Total de fornecedores ativos',
    color: 'green',
  };

  info = {
    title: 'Top fornecedores',
    contents: ['Carlos', 'João Frango', 'Zézin'],
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.getAllFornecedores();
  }

  getAllFornecedores() {
    this.fornecedores = [];
    this.totalProducts = this.fornecedores.length;
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
