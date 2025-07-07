import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { formatInputToMoney } from 'src/app/shared/functions/constants';

@Component({
  selector: 'app-cadastro-lote',
  templateUrl: './cadastro-lote.component.html',
  styleUrls: ['./cadastro-lote.component.scss'],
})
export class CadastroLoteComponent {
  cadastroForm!: FormGroup;

  tipos = ['gado', 'porco', 'frango'];
  categorias = ['maminha', 'coxão mole', 'coxão duro', 'coxas', 'peito', 'bisteca'];
  fornecedores = ['falcao', 'lorena', 'wilhelm'];

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.cadastroForm = this.fb.group({
      fornecedor: ['falcao', Validators.required],
      tipo: ['gado', Validators.required],
      categoria: ['maminha', Validators.required],
      validoAte: [new Date(), Validators.required],
      quantidade: [200, [Validators.required, Validators.min(1)]],
      valor: [35, [Validators.required, Validators.min(0.01)]],
      descricao: [''],
    });

    this.cadastroForm.valueChanges.subscribe(() => {
      this.calculateTotal();
    });

    this.calculateTotal();
  }

  formatInput(event: any, field: string) {
    const value = formatInputToMoney(event, field);

    this.cadastroForm.get(field)?.setValue(value);
  }

  calculateTotal(): void {
    const quantidade = this.cadastroForm.get('quantidade')?.value || 0;
    const valor = this.cadastroForm.get('valor')?.value || 0;
    const valorTotal = quantidade * valor;

    this.cadastroForm.patchValue({ valorTotal }, { emitEvent: false });
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      console.log('Dados enviados:', this.cadastroForm.value);
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }

  voltar() {
    this.router.navigate(['/lotes']);
  }
}
