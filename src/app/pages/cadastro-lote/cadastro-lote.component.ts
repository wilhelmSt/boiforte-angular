import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsTable } from 'src/app/components/products-table/products-table.component';
import { Fornecedor } from 'src/app/interfaces/fornecedor';
import { SearchResponse, TInfo } from 'src/app/interfaces/geral';
import { FornecedorService } from 'src/app/services/fornecedor/fornecedor.service';
import { formatInputToMoney } from 'src/app/shared/functions/constants';

@Component({
  selector: 'app-cadastro-lote',
  templateUrl: './cadastro-lote.component.html',
  styleUrls: ['./cadastro-lote.component.scss'],
})
export class CadastroLoteComponent implements OnInit {
  cadastroForm!: FormGroup;

  tipos = ['gado', 'porco', 'frango'];
  categorias = ['Maminha', 'Coxão mole', 'Coxão duro', 'Coxas', 'Peito', 'Bisteca'];
  fornecedores: Fornecedor[] = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getAllFornecedores();
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

  getAllFornecedores(termo = {}) {
    this.isLoading = true;

    this.fornecedorService.getFornecedoresValidos().subscribe({
      next: (res: { fornecedoresValidos: Fornecedor[] }) => {
        this.fornecedores = res.fornecedoresValidos || [];
      },
      error: (error) => console.error('Error ao carregar fornecedores'),
      complete: () => (this.isLoading = false),
    });
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
