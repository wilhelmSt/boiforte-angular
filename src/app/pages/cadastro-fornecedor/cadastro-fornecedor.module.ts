import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroFornecedorComponent } from './cadastro-fornecedor.component';
import { CadastroFornecedorRoutingModule } from './cadastro-fornecedor-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CadastroFornecedorComponent],
  imports: [CommonModule, CadastroFornecedorRoutingModule, MatIconModule, FormsModule, ReactiveFormsModule],
})
export class CadastroFornecedorModule {}
