import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-fornecedor',
  templateUrl: './cadastro-fornecedor.component.html',
  styleUrls: ['./cadastro-fornecedor.component.scss'],
})
export class CadastroFornecedorComponent {
  form = {
    nome: 'João da Silva',
    cpfCnpj: '123.123.123-12',
    telefone: '88 9 9344 4444',
    email: 'carninha@gmail.com',
    descricao: 'carne bovina',
  };

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Dados enviados:', this.form);
  }

  voltar() {
    this.router.navigate(['/fornecedores']);
  }
}
