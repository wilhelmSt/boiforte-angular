import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente';
import { Compra, CreateCompraDto, CreateItemCompraDto } from 'src/app/interfaces/compra';
import { Corte, EspecieCorte } from 'src/app/interfaces/especie';
import { Produto } from 'src/app/interfaces/produto';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { CompraService } from 'src/app/services/compra/compra.service';
import { EspecieService } from 'src/app/services/especie/especie.service';
import { ProdutoService } from 'src/app/services/produto/produto.service';
import Swal from 'sweetalert2';

type CorteEspecie = {
  corte?: string;
  especie?: string;
};

@Component({
  selector: 'app-cadastro-compra',
  templateUrl: './cadastro-compra.component.html',
  styleUrls: ['./cadastro-compra.component.scss'],
})
export class CadastroCompraComponent {
  loadingButtonCreate = false;
  cadastroForm!: FormGroup;
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  itens: Array<CreateItemCompraDto & CorteEspecie> = [];
  produtoSelecionado: Produto | null = null;
  quantidadeItem: number = 1;
  precoItem: number = 0;
  isLoading: boolean = false;
  cortes: Corte[] = [];
  especies: EspecieCorte[] = [];
  produtosDisponiveis: Produto[] = [];
  adicionandoItem: boolean = false;

  descontoItem: number = 0;
  totalItem: number = 0;
  acao: 'VISUALIZAR' | 'EDITAR' | null = null;
  acaoId: string | number | null = null;
  acaoData: Compra | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private compraService: CompraService,
    private especieService: EspecieService,
    private route: ActivatedRoute
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

  populateForm(data: Compra) {
    this.cadastroForm.get('clienteId')?.setValue(data?.cliente?.id);
    this.cadastroForm.get('tipoPagamento')?.setValue(data?.tipoPagamento);
    this.cadastroForm.get('condicaoPagamento')?.setValue(data?.condicaoPagamento);
    this.cadastroForm.get('desconto')?.setValue(data?.descontoFinal);
    this.cadastroForm.get('observacao')?.setValue(data?.observacao);
    this.cadastroForm.get('valorTotal')?.setValue(data?.valorTotal);
    this.cadastroForm.get('valorTotalFinal')?.setValue(data?.valorTotalFinal);
    this.cadastroForm.get('descontoFinal')?.setValue(data?.descontoFinal);
    this.itens = data.itens as unknown as Array<CreateItemCompraDto & CorteEspecie>;
    this.updateFormState();
  }

  updateFormState(): void {
    if (this.acao === 'VISUALIZAR') {
      this.cadastroForm?.disable();
    } else {
      this.cadastroForm?.enable();
    }
  }

  getById() {
    this.compraService.obterPorId(Number(this.acaoId)).subscribe({
      next: (res) => {
        this.acaoData = res;
        this.populateForm(this.acaoData);
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

  ngOnInit() {
    this.initializeForm();
    this.carregarDados();
  }

  initializeForm(): void {
    this.cadastroForm = this.fb.group(
      {
        clienteId: ['', Validators.required],
        tipoPagamento: ['DINHEIRO', Validators.required],
        condicaoPagamento: ['A_VISTA', Validators.required],
        desconto_item: [0],
        quantidade_item: [0],
        especie: ['', Validators.required],
        corte: ['', Validators.required],
        desconto: [0, [Validators.min(0)]],
        observacao: [''],
        valorTotal: [0],
        valorTotalFinal: [0],
        descontoFinal: [0],
      },
      { validator: this.validarCondicaoPagamento }
    );

    this.updateFormState();
  }

  validarCondicaoPagamento(group: FormGroup) {
    const tipoPagamento = group.get('tipoPagamento')?.value;
    const condicaoPagamento = group.get('condicaoPagamento')?.value;

    if (tipoPagamento !== 'CARTAO' && condicaoPagamento === 'PARCELADO') {
      group.get('condicaoPagamento')?.setErrors({ invalidCondition: true });
      return { invalidCondition: true };
    }
    return null;
  }

  onTipoPagamentoChange() {
    const tipoPagamento = this.cadastroForm.get('tipoPagamento')?.value;

    if (tipoPagamento !== 'CARTAO') {
      this.cadastroForm.get('condicaoPagamento')?.setValue('A_VISTA');
    }

    this.cadastroForm.get('condicaoPagamento')?.updateValueAndValidity();
  }

  carregarDados(): void {
    this.isLoading = true;

    forkJoin({
      clientes: this.clienteService.listarTodos(),
      produtos: this.produtoService.listarTodos(),
      especies: this.especieService.listCortes(),
    }).subscribe({
      next: (res) => {
        this.clientes = res.clientes;
        this.produtos = res.produtos;

        this.especies = res.especies.filter((e) => {
          e.corteProduto = e.corteProduto.filter((c) => {
            let hasCorte = false;

            res.produtos.forEach((p) => {
              if (p.corteId === c.id) {
                hasCorte = true;
              }
            });

            return hasCorte;
          });

          return !!e.corteProduto?.length;
        });

        if (this.especies.length) {
          this.onChangeSpecies({ value: this.especies[0]?.id });
        }

        this.isLoading = false;
      },
      error: (er) => {
        console.error('Erro ao carregar dados:', er);
        this.isLoading = false;
      },
    });
  }

  onChangeSpecies(target: any) {
    this.cadastroForm.get('especie')?.setValue(target?.value);
    this.cortes = this.especies.find(({ id }) => Number(id) === Number(target?.value))?.corteProduto || [];

    this.onChangeCortes({ value: this.cortes[0].id });
  }

  onChangeCortes(target: any) {
    this.cadastroForm.get('corte')?.setValue(target?.value);
    this.produtoSelecionado = this.produtos.find((p) => Number(p.corteId) === Number(target?.value)) || null;

    this.cadastroForm.get('quantidade_item')?.setValue(0);

    this.precoItem = this.produtoSelecionado?.promocao
      ? this.produtoSelecionado?.precoPromocional || 0
      : this.produtoSelecionado?.precoPadrao || 0;
  }

  calcularTotalItem(): void {
    const subtotal = Number(this.cadastroForm.get('quantidade_item')?.value) * this.precoItem;
    this.totalItem = subtotal - Number(this.cadastroForm.get('desconto_item')?.value);

    if (this.totalItem < 0) this.totalItem = 0;
  }

  adicionarItem(): void {
    if (!this.produtoSelecionado) return;

    this.adicionandoItem = true;

    const novoItem: CreateItemCompraDto & CorteEspecie = {
      produtoId: this.produtoSelecionado?.id,
      especie: this.especies.find((e) => e.id == this.cadastroForm.get('especie')?.value)?.nome,
      corte: this.cortes.find((c) => c.id == this.cadastroForm.get('corte')?.value)?.nome,
      quantidade: Number(this.cadastroForm.get('quantidade_item')?.value),
      preco: this.precoItem,
      desconto: Number(this.cadastroForm.get('desconto_item')?.value) || 0,
      total: Number(this.totalItem.toFixed(2)),
    };

    const item = this.itens.findIndex((i) => i.produtoId === novoItem.produtoId);

    if (item !== -1) {
      this.itens[item] = {
        ...this.itens[item],
        total: Number((this.itens[item]?.total + novoItem.total).toFixed(2)),
        quantidade: Number((this.itens[item]?.quantidade + novoItem.quantidade).toFixed(2)),
        desconto: (this.itens[item]?.desconto || 0) + (novoItem?.desconto || 0),
      };
    } else {
      this.itens.push(novoItem);
    }

    this.atualizarTotais();
    this.resetarFormularioItem();
  }

  resetarFormularioItem(): void {
    this.cadastroForm.get('quantidade_item')?.reset();
    this.cadastroForm.get('desconto_item')?.reset();
    this.calcularTotalItem();

    this.adicionandoItem = false;
  }

  atualizarTotais(): void {
    const total = this.calcularTotal();
    const desconto = this.cadastroForm.get('desconto')?.value || 0;
    const totalFinal = total - desconto;

    this.cadastroForm.patchValue({
      valorTotal: total,
      valorTotalFinal: totalFinal > 0 ? totalFinal : 0,
      descontoFinal: desconto,
    });
  }

  calcularTotal(): number {
    return this.itens.reduce((sum, item) => sum + item.total, 0);
  }

  calcularTotalFinal(): number {
    const total = this.calcularTotal();
    const desconto = this.cadastroForm.get('desconto')?.value || 0;
    return total - desconto;
  }

  removerItem(index: number): void {
    Swal.fire({
      title: 'Remover item',
      text: 'Deseja realmente remover este item da compra?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, remover',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const itemRemovido = this.itens.splice(index, 1)[0];

        this.atualizarTotais();

        this.toastr.success('Item removido com sucesso', 'Sucesso');
      }
    });
  }

  async onSubmit() {
    if (this.cadastroForm.valid && this.itens.length > 0) {
      const body: CreateCompraDto = {
        ...this.cadastroForm.value,
        clienteId: Number(this.cadastroForm.get('clienteId')?.value),
        itens: this.itens,
      };

      await this.createCompra(body);
    } else {
      this.cadastroForm.markAllAsTouched();
      if (this.itens.length === 0) {
        this.toastr.warning('Adicione pelo menos um item à compra', 'Atenção');
      }
    }
  }

  async createCompra(compra: CreateCompraDto) {
    this.loadingButtonCreate = true;

    this.compraService.criar(compra).subscribe({
      next: (res) => {
        this.callSwalConfirm();
      },
      error: (er) => {
        console.error(er);
        this.loadingButtonCreate = false;

        let errorMessage = 'Erro ao cadastrar compra (contate o suporte).';

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
      complete: () => {
        this.loadingButtonCreate = false;
      },
    });
  }

  callSwalConfirm() {
    Swal.fire({
      title: 'Compra cadastrada com sucesso!',
      icon: 'success',
      cancelButtonText: 'Cadastrar nova compra',
      confirmButtonText: 'Lista de Compras',
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
        this.itens = [];
        this.initializeForm();
      }
    });
  }

  voltar() {
    this.router.navigate(['/compras']);
  }
}
