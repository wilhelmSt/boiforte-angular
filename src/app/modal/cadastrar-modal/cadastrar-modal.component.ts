import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-modal',
  templateUrl: './cadastrar-modal.component.html',
  styleUrls: ['./cadastrar-modal.component.scss'],
})
export class CadastrarModalComponent {
  buttons: Array<{
    label: string;
    icon: string;
    isWhite?: boolean;
    callBackFn: Function;
  }> = [
    {
      label: 'Cadastrar Produtos',
      icon: 'cortes-white.svg',
      callBackFn: () => this.navigateTo('/cadastro-produtos'),
    },
    {
      label: 'Cadastrar lote',
      icon: 'lotes-white.svg',
      callBackFn: () => this.navigateTo('/cadastro-lote'),
    },
    {
      label: 'Cadastrar pedidos',
      icon: 'pedidos-white.svg',
      callBackFn: () => this.navigateTo('/cadastro-pedido'),
    },
    {
      label: 'Cadastrar fornecedor',
      icon: 'fornecedores-white.svg',
      callBackFn: () => this.navigateTo('/cadastro-fornecedor'),
    },
    {
      label: 'Cadastrar cliente',
      icon: 'clientes-white.svg',
      callBackFn: () => this.navigateTo('/cadastro-cliente'),
    },
    // {
    //   label: 'Gerar relatório Geral',
    //   icon: 'excel-file-white.svg',
    //   callBackFn: () => {},
    // },
    // {
    //   label: 'Configurações gerais',
    //   icon: 'configuracoes.svg',
    //   isWhite: true,
    //   callBackFn: () => {},
    // },
  ];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<CadastrarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  navigateTo(path: string) {
    this.close();
    this.router.navigate([path]);
  }

  close(): void {
    this.dialogRef.close();
  }
}
