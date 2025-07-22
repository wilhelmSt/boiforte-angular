import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente, CreateClienteDto } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss'],
})
export class CadastroClienteComponent implements OnInit {
  cadastroForm!: FormGroup;
  loadingButtonCreate = false;
  acao: 'VISUALIZAR' | 'EDITAR' | null = null;
  acaoId: string | number | null = null;
  acaoData: Cliente | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private clienteService: ClienteService,
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
    this.initializeForm();
  }

  atualizarQueryParam(param: string, value: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [param]: value },
      queryParamsHandling: 'merge',
    });
  }

  updateFormState(): void {
    if (this.acao === 'VISUALIZAR') {
      this.cadastroForm.disable();
    } else {
      this.cadastroForm.enable();
    }
  }

  populateForm(data: Cliente): void {
    // TO-DO
  }

  getById() {
    this.clienteService.obterPorId(Number(this.acaoId)).subscribe({
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

  initializeForm(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpfCnpj: ['', [Validators.required, Validators.minLength(14)]],
      email: ['', [Validators.email]],
      telefone: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(15)]],
      endereco: [''],
      observacao: [''],
    });

    this.updateFormState();
  }

  onUpdate(): void {
    // TO-DO
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      this.loadingButtonCreate = true;

      const body: CreateClienteDto = {
        nome: this.cadastroForm.get('nome')?.value,
        cpfCnpj: this.cadastroForm.get('cpfCnpj')?.value,
        telefone: this.cadastroForm.get('telefone')?.value,
        email: this.cadastroForm.get('email')?.value || null,
        endereco: this.cadastroForm.get('endereco')?.value || null,
        observacao: this.cadastroForm.get('observacao')?.value || null,
      };

      const reqBody = {
        ...body,
        cpfCnpj: body.cpfCnpj?.replace(/\D/g, '') || '',
        telefone: body.telefone?.replace(/\D/g, '') || '',
      };

      this.clienteService.criar(reqBody).subscribe({
        next: () => {
          this.callSwalConfirm();
        },
        error: (er) => {
          console.error(er);

          let errorMessage = 'Erro ao cadastrar cliente (contate o suporte).';

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

      console.log('Dados enviados:', this.cadastroForm.value);
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }

  callSwalConfirm() {
    Swal.fire({
      title: 'Cliente cadastrado com sucesso!',
      icon: 'success',
      cancelButtonText: 'Cadastrar novo cliente',
      confirmButtonText: 'Clientes',
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

  formatarCpfCnpj(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length <= 11) {
      // (000.000.000-00)
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // (00.000.000/0000-00)
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }

    this.cadastroForm.get('cpfCnpj')?.setValue(value, { emitEvent: false });
  }

  formatarTelefone(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 10) {
      // (00) 00000-0000
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
    } else {
      // (00) 0000-0000
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }

    this.cadastroForm.get('telefone')?.setValue(value, { emitEvent: false });
  }

  voltar() {
    this.router.navigate(['/clientes']);
  }

  getPageTitle(): string {
    return this.acao ? (this.acao === 'VISUALIZAR' ? 'Visualização' : 'Edição') : 'Cadastro';
  }

  getSubmitText(): string {
    return this.acao ? (this.acao === 'VISUALIZAR' ? '' : 'Salvar') : 'Cadastrar';
  }
}
