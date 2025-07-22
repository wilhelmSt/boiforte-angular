import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Corte, EspecieCorte } from 'src/app/interfaces/especie';
import { CreateProdutoDto, Produto } from 'src/app/interfaces/produto';
import { EspecieService } from 'src/app/services/especie/especie.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss'],
})
export class CadastroProdutoComponent {
  loadingButtonCreate = false;
  cadastroForm!: FormGroup;
  especies: EspecieCorte[] = [];
  cortesFiltrados: Corte[] = [];
  acao: 'VISUALIZAR' | 'EDITAR' | null = null;
  acaoId: string | number | null = null;
  acaoData: Produto | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private especieService: EspecieService,
    private produtoService: ProdutoService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['acao']) {
        this.acao = params['acao'] === 'VISUALIZAR' ? 'VISUALIZAR' : 'EDITAR';
      }

      if (params['id']) {
        this.acaoId = isNaN(Number(params['id'])) ? Number(params['id']) : params['id'];
        this.getById();
      }
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.getAllEspecies();
  }

  getById() {
    this.produtoService.obterPorId(Number(this.acaoId)).subscribe({
      next: (res) => {
        this.acaoData = res;
      },
      error: (err) => {
        console.error('Erro ao buscar ID ' + this.acaoId, err);
        this.toastr.error('Não foi possível buscar os dados desejados, tente novamente mais tarde', 'Erro', {
          timeOut: 5000,
          closeButton: true,
        });
        this.voltar();
      },
    });
  }

  initializeForm(): void {
    this.cadastroForm = this.fb.group({
      codigo: ['', [Validators.minLength(2), Validators.maxLength(20)]],
      especieId: ['', Validators.required],
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

  async onSubmit() {
    if (this.cadastroForm.valid) {
      const body: CreateProdutoDto = {
        codigo: this.cadastroForm.get('codigo')?.value || '',
        precoPadrao: Number(this.cadastroForm.get('precoPadrao')?.value),
        estoqueMinimo: Number(this.cadastroForm.get('estoqueMinimo')?.value),
        promocao: this.cadastroForm.get('promocao')?.value || false,
        precoPromocional: Number(this.cadastroForm.get('precoPromocional')?.value),
        descontoAtacado: this.cadastroForm.get('descontoAtacado')?.value || false,
        precoAtacado: Number(this.cadastroForm.get('precoAtacado')?.value),
        quantidadeAtacado: Number(this.cadastroForm.get('quantidadeAtacado')?.value),
        corteId: Number(this.cadastroForm.get('corteId')?.value),
        descricao: this.cadastroForm.get('descricao')?.value || '',
      };

      await this.createProduto(body);
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

  getAllEspecies() {
    this.especieService.listCortes().subscribe({
      next: (res) => {
        this.especies = res;
      },
      error: (er) => console.error(er),
    });
  }

  callSwalConfirm() {
    Swal.fire({
      title: 'Produto cadastrado com sucesso!',
      icon: 'success',
      cancelButtonText: 'Cadastrar novo produto',
      confirmButtonText: 'Produtos',
      showCancelButton: true,
      reverseButtons: true,
      customClass: {
        cancelButton: 'swal2-cancel',
        confirmButton: 'swal2-confirm',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.voltar();
      } else if (result.isDismissed) {
        this.cadastroForm.reset();
      }
    });
  }

  async createProduto(produto: CreateProdutoDto) {
    this.loadingButtonCreate = true;

    this.produtoService.criar(produto).subscribe({
      next: (res) => {
        this.callSwalConfirm();
      },
      error: (er) => {
        console.error(er);

        let errorMessage = 'Erro ao cadastrar produto (contate o suporte).';

        if (er.error?.errors) {
          errorMessage = '';

          er.error?.errors?.forEach((er: any) => {
            errorMessage += er.message + '\n';
          });
        }

        this.toastr.error(errorMessage, 'Erro', {
          timeOut: 5000,
          closeButton: true,
        });
      },
      complete: () => (this.loadingButtonCreate = false),
    });
  }

  onEspecieChange(): void {
    const especieId = this.cadastroForm.get('especieId')?.value;
    this.cadastroForm.get('corteId')?.setValue('');

    if (especieId) {
      const especieSelecionada = this.especies.find((e) => e.id === Number(especieId));
      this.cortesFiltrados = especieSelecionada?.corteProduto || [];
    } else {
      this.cortesFiltrados = [];
    }
  }

  voltar() {
    this.router.navigate(['/produtos']);
  }

  getPageTitle(): string {
    return this.acao ? (this.acao === 'VISUALIZAR' ? 'Visualização' : 'Edição') : 'Cadastro';
  }
}
