import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Corte, EspecieCorte } from 'src/app/interfaces/especie';
import { Fornecedor } from 'src/app/interfaces/fornecedor';
import { Lote } from 'src/app/interfaces/lote';
import { EspecieService } from 'src/app/services/especie/especie.service';
import { FornecedorService } from 'src/app/services/fornecedor/fornecedor.service';
import { LoteService } from 'src/app/services/lote/lote.service';
import { formatInputToMoney } from 'src/app/shared/functions/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-lote',
  templateUrl: './cadastro-lote.component.html',
  styleUrls: ['./cadastro-lote.component.scss'],
})
export class CadastroLoteComponent implements OnInit {
  cadastroForm!: FormGroup;
  loadingButtonCreate = false;
  fornecedores: Fornecedor[] = [];
  especies: EspecieCorte[] = [];
  cortes: Corte[] = [];
  isLoading: boolean = false;
  acao: 'VISUALIZAR' | 'EDITAR' | null = null;
  acaoId: string | number | null = null;
  acaoData: Lote | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private especieService: EspecieService,
    private loteService: LoteService,
    private toastr: ToastrService
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
    this.defineForm();
    this.getInfo();
  }

  getById() {
    this.loteService.obterPorId(Number(this.acaoId)).subscribe({
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

  defineForm(): void {
    this.cadastroForm = this.fb.group({
      fornecedor: ['', Validators.required],
      tipo: ['', Validators.required],
      categoria: ['', Validators.required],
      validoAte: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      valor: [0, [Validators.required, Validators.min(0.01)]],
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
      validoAte: ['', Validators.required],
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
      fornecedores: this.fornecedorService.buscar(),
      cortes: this.especieService.listCortes(),
    }).subscribe({
      next: (res) => {
        this.fornecedores = res.fornecedores.data || [];
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
    this.cortes = this.especies.find(({ id }) => Number(id) === Number(target?.value))?.corteProduto || [];
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
      this.loadingButtonCreate = true;

      this.loteService
        .criar({
          quantidade: Number(this.cadastroForm.value['quantidade']),
          custoUnitario: Number(this.cadastroForm.value['valor']),
          custoTotal: this.cadastroForm.value.quantidade * this.cadastroForm.value.valor || 0,
          vencimento: this.cadastroForm.value['validoAte'] || new Date().toISOString(),
          corteId: Number(this.cadastroForm.value['categoria']),
          fornecedorId: Number(this.cadastroForm.value['fornecedor']),
          descricao: this.cadastroForm.value['descricao'] || '',
        })
        .subscribe({
          next: (res) => {
            this.callSwalConfirm();
            this.loadingButtonCreate = false;
          },
          error: (error) => {
            console.error(error);

            let errorMessage = 'Erro ao cadastrar lote (contate o suporte).';

            if (error.error?.errors) {
              errorMessage = '';

              error.error?.errors?.forEach((er: any) => {
                errorMessage += er.message + '\n';
              });
            }

            if (error.error?.message) {
              errorMessage = error.error.message;
            }

            this.toastr.error(errorMessage, 'Erro', {
              timeOut: 5000,
              closeButton: true,
            });
            this.loadingButtonCreate = false;
          },
        });
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }

  callSwalConfirm() {
    Swal.fire({
      title: 'Lote cadastrado com sucesso!',
      icon: 'success',
      cancelButtonText: 'Cadastrar novo lote',
      confirmButtonText: 'Lotes',
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

  voltar() {
    this.router.navigate(['/lotes']);
  }

  getPageTitle(): string {
    return this.acao ? (this.acao === 'VISUALIZAR' ? 'Visualização' : 'Edição') : 'Cadastro';
  }
}
