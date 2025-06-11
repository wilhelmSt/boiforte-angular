import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-relatorio-modal',
  templateUrl: './relatorio-modal.component.html',
  styleUrls: ['./relatorio-modal.component.scss'],
})
export class RelatorioModalComponent {
  formato: string | null = null;
  loading = false;
  gerado = false;

  constructor(
    public dialogRef: MatDialogRef<RelatorioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  gerarRelatorio() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.gerado = true;
    }, 2000);
  }

  close(): void {
    this.dialogRef.close();
  }
}
