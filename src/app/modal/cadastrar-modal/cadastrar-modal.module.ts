import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarModalComponent } from './cadastrar-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [CadastrarModalComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule],
})
export class CadastrarModalModule {}
