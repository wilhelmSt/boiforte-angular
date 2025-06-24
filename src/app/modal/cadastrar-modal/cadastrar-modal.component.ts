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
      label: 'Cadastrar cortes',
      icon: 'cortes-white.svg',
      callBackFn: () => this.router.navigate(['/cortes']),
    },
    {
      label: 'Cadastrar espécies',
      icon: 'especies-white.svg',
      callBackFn: () => this.router.navigate(['/especies']),
    },
    {
      label: 'Cadastrar lote',
      icon: 'lotes-white.svg',
      callBackFn: () => this.router.navigate(['/lotes']),
    },
    {
      label: 'Cadastrar pedidos',
      icon: 'pedidos-white.svg',
      callBackFn: () => this.router.navigate(['/pedidos']),
    },
    {
      label: 'Cadastrar fornecedor',
      icon: 'fornecedores-white.svg',
      callBackFn: () => this.router.navigate(['/fornecedores']),
    },
    {
      label: 'Cadastrar cliente',
      icon: 'clientes-white.svg',
      callBackFn: () => this.router.navigate(['/clientes']),
    },
    {
      label: 'Gerar relatório Geral',
      icon: 'excel-file-white.svg',
      callBackFn: () => {},
    },
    {
      label: 'Configurações gerais',
      icon: 'configuracoes.svg',
      isWhite: true,
      callBackFn: () => {},
    },
  ];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<CadastrarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
