import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-corte',
  templateUrl: './cadastro-corte.component.html',
  styleUrls: ['./cadastro-corte.component.scss'],
})
export class CadastroCorteComponent {
  form = {
    nomeCorte: 'Maminha',
    especie: 'Gado',
    validoAte: '11/02/25',
    quantidade: 100,
    idLote: '123',
    dataEntrada: '12/02/25 11:20:23',
    fornecedor: 'Seu Zé LTDA.',
  };

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Dados enviados:', this.form);
  }

  voltar() {
    this.router.navigate(['/cortes']);
  }
}
