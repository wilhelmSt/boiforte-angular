import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Categoria, EspecieCorte } from 'src/app/interfaces/especie';
import { Fornecedor } from 'src/app/interfaces/fornecedor';
import { EspecieService } from 'src/app/services/especie/especie.service';
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
  especies: EspecieCorte[] = [];
  cortes: Categoria[] = [];

  isLoading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private especieService: EspecieService
  ) {}

  ngOnInit() {
    this.defineForm();
    this.getInfo();
  }

  defineForm(): void {
    this.cadastroForm = this.fb.group({
      fornecedor: ['', Validators.required],
      tipo: ['', Validators.required],
      categoria: ['', Validators.required],
      validoAte: [new Date(), Validators.required],
      quantidade: [, [Validators.required, Validators.min(1)]],
      valor: [, [Validators.required, Validators.min(0.01)]],
      descricao: [''],
    });
  }

  initializeForm(): void {
    const defaultFornecedor = this.fornecedores.length ? this.fornecedores[0].id : '';
    const defaultEspecie = this.especies.length ? this.especies[0].id : '';
    const defaultCorte =
      this.especies.length && this.especies[0].corteProduto?.length ? this.especies[0].corteProduto[0].id : '';

    this.cadastroForm = this.fb.group({
      fornecedor: [defaultFornecedor, Validators.required],
      tipo: [defaultEspecie, Validators.required],
      categoria: [defaultCorte, Validators.required],
      validoAte: [new Date(), Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      valor: [0, [Validators.required, Validators.min(0.01)]],
      descricao: [''],
    });

    this.cadastroForm.valueChanges.subscribe(() => {
      this.calculateTotal();
    });

    this.calculateTotal();
  }

  getInfo() {
    this.isLoading = true;

    forkJoin({
      fornecedores: this.fornecedorService.getFornecedoresValidos(),
      cortes: this.especieService.listCortes(),
    }).subscribe({
      next: (res) => {
        this.fornecedores = res.fornecedores.fornecedoresValidos || [];
        this.especies = res.cortes || [];
        this.isLoading = false;

        this.initializeForm();

        if (this.especies.length) {
          this.onChangeSpecies({ value: this.especies[0]?.id });
        }
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
        this.isLoading = false;
      },
    });
  }

  onChangeSpecies(target: any) {
    this.cortes = this.especies.find(({ id }) => id === target?.value)?.corteProduto || [];
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
