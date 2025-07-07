import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroLoteComponent } from './cadastro-lote.component';
import { CadastroLoteRoutingModule } from './cadastro-lote-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CadastroLoteComponent],
  imports: [CommonModule, CadastroLoteRoutingModule, FormsModule, MatIconModule, ReactiveFormsModule],
})
export class CadastroLoteModule {}
