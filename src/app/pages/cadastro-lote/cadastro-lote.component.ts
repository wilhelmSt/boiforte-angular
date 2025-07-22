import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';
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

      this.updateFormState();
    });
  }

  ngOnInit() {
    this.defineForm();
    this.getInfo();
  }

  atualizarQueryParam(param: string, value: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [param]: value },
      queryParamsHandling: 'merge',
    });
  }

  updateFormState(): void {
    if (this.acao) {
      if (this.acao === 'VISUALIZAR') {
        this.cadastroForm?.disable();
      } else {
        this.cadastroForm?.enable();
        this.cadastroForm?.get('tipo')?.disable();
        this.cadastroForm?.get('categoria')?.disable();
        this.cadastroForm?.get('fornecedor')?.disable();
      }
    }
  }

  populateForm(data: any): void {
    this.cadastroForm?.get('fornecedor')?.setValue(data.fornecedorId);
    this.cadastroForm?.get('tipo')?.setValue(data.produto?.corte?.especieProduto?.id);
    this.cadastroForm?.get('categoria')?.setValue(data.produto?.corte?.id);
    this.cadastroForm?.get('validoAte')?.setValue(dayjs(data.vencimento).format('YYYY-MM-DD'));
    this.cadastroForm?.get('quantidade')?.setValue(data.quantidade);
    this.cadastroForm?.get('valor')?.setValue(data.custoUnitario);
    this.cadastroForm?.get('descricao')?.setValue(data.descricao);

    this.onChangeSpecies({ value: this.cadastroForm.get('tipo')?.value });
  }

  getById() {
    this.loteService.obterPorId(Number(this.acaoId)).subscribe({
      next: (res) => {
        this.acaoData = res;
        if (!this.isLoading) this.populateForm(this.acaoData);
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

    this.updateFormState();
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
    this.updateFormState();
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

        if (this.acao && this.acaoData) this.populateForm(this.acaoData);

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

  getFormData() {
    return {
      quantidade: Number(this.cadastroForm.value['quantidade']),
      custoUnitario: Number(this.cadastroForm.value['valor']),
      custoTotal: this.cadastroForm.value.quantidade * this.cadastroForm.value.valor || 0,
      vencimento: this.cadastroForm.value['validoAte'] || new Date().toISOString(),
      descricao: this.cadastroForm.value['descricao'] || '',
    };
  }

  onUpdate(): void {
    if (this.cadastroForm.valid) {
      this.loadingButtonCreate = true;

      this.loteService.atualizar(Number(this.acaoId), this.getFormData()).subscribe({
        next: () => {
          this.callSwalConfirmUpdate();
          this.loadingButtonCreate = false;
        },
        error: (err) => {
          console.error('Faha ao editar Lote: ', err);
          this.toastr.error('Falha ao editar Lote', 'Erro', {
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

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      this.loadingButtonCreate = true;

      this.loteService
        .criar({
          ...this.getFormData(),
          corteId: Number(this.cadastroForm.value['categoria']),
          fornecedorId: Number(this.cadastroForm.value['fornecedor']),
        })
        .subscribe({
          next: () => {
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

  callSwalConfirmUpdate() {
    this.callSwal(
      {
        title: 'Lote editado com sucesso!',
        confirmButtonText: 'Lotes',
        cancelButtonText: 'Visualizar',
      },
      (result: any) => {
        if (result.isConfirmed) {
          this.voltar();
        } else if (result.isDismissed) {
          this.atualizarQueryParam('acao', 'VISUALIZAR');
        }
      }
    );
  }

  callSwalConfirm() {
    this.callSwal(
      {
        title: 'Lote cadastrado com sucesso!',
        confirmButtonText: 'Lotes',
        cancelButtonText: 'Cadastrar novo lote',
      },
      (result: any) => {
        if (result.isConfirmed) {
          this.voltar();
        } else if (result.isDismissed) {
          this.cadastroForm.reset();
        }
      }
    );
  }

  callSwal(data: any, fn: any) {
    Swal.fire({
      title: data.title,
      icon: 'success',
      cancelButtonText: data.cancelButtonText,
      confirmButtonText: data.confirmButtonText,
      showCancelButton: true,
      reverseButtons: true,
      customClass: {
        cancelButton: 'swal2-cancel',
        confirmButton: 'swal2-confirm',
      },
    }).then(fn);
  }

  voltar() {
    this.router.navigate(['/lotes']);
  }

  getPageTitle(): string {
    return this.acao ? (this.acao === 'VISUALIZAR' ? 'Visualização' : 'Edição') : 'Cadastro';
  }

  getSubmitText(): string {
    return this.acao ? (this.acao === 'VISUALIZAR' ? '' : 'Salvar') : 'Cadastrar';
  }
}
