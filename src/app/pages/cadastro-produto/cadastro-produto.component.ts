import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EspecieCorte } from 'src/app/interfaces/especie';
import { EspecieService } from 'src/app/services/especie/especie.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss'],
})
export class CadastroProdutoComponent {
  cadastroForm!: FormGroup;
  cortes: EspecieCorte[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private especieService: EspecieService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getAllCortes();
  }

  initializeForm(): void {
    this.cadastroForm = this.fb.group({
      codigo: ['', [Validators.minLength(2), Validators.maxLength(20)]],
      corteId: ['', Validators.required],
      precoPadrao: ['', [Validators.required, Validators.min(0.01)]],
      estoqueMinimo: ['', [Validators.required, Validators.min(0)]],
      promocao: [false],
      precoPromocional: ['', [Validators.min(0.01)]],
      descontoAtacado: [false],
      precoAtacado: ['', [Validators.min(0.01)]],
      quantidadeAtacado: ['', [Validators.min(1)]],
      descricao: ['', [Validators.maxLength(255)]],
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log('Dados enviados:', this.cadastroForm.value);
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }

  togglePromocao() {
    const precoPromocional = this.cadastroForm.get('precoPromocional');

    if (this.cadastroForm.get('promocao')?.value) {
      precoPromocional?.setValidators([Validators.required, Validators.min(0.01)]);
    } else {
      precoPromocional?.clearValidators();
      precoPromocional?.reset();
    }

    precoPromocional?.updateValueAndValidity();
  }

  toggleAtacado() {
    const precoAtacado = this.cadastroForm.get('precoAtacado');
    const quantidadeAtacado = this.cadastroForm.get('quantidadeAtacado');

    if (this.cadastroForm.get('descontoAtacado')?.value) {
      precoAtacado?.setValidators([Validators.required, Validators.min(0.01)]);
      quantidadeAtacado?.setValidators([Validators.required, Validators.min(1)]);
    } else {
      precoAtacado?.clearValidators();
      quantidadeAtacado?.clearValidators();
      precoAtacado?.reset();
      quantidadeAtacado?.reset();
    }

    precoAtacado?.updateValueAndValidity();
    quantidadeAtacado?.updateValueAndValidity();
  }

  getAllCortes() {
    this.especieService.listCortes().subscribe({
      next: (res) => {
        this.cortes = res;
      },
      error: (er) => console.error(er),
    });
  }

  voltar() {
    this.router.navigate(['/produtos']);
  }
}
