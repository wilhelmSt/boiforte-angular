import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-corte',
  templateUrl: './cadastro-corte.component.html',
  styleUrls: ['./cadastro-corte.component.scss'],
})
export class CadastroCorteComponent {
  cadastroForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.cadastroForm = this.fb.group({
      nomeCorte: ['Maminha', [Validators.required, Validators.minLength(2)]],
      especie: ['Gado', [Validators.required]],
      dataEntrada: ['12/02/25 11:20:23'],
      validoAte: ['11/02/25'],
      quantidade: [100, [Validators.min(0)]],
      idLote: [{ value: '123', disabled: true }],
      fornecedor: ['Seu Zé LTDA.'],
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log('Dados enviados:', this.cadastroForm.value);
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }

  voltar() {
    this.router.navigate(['/cortes']);
  }
}
