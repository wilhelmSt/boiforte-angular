import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroProdutoComponent } from './cadastro-produto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CadastroProdutoRoutingModule } from './cadastro-produto-routing.module';

@NgModule({
  declarations: [CadastroProdutoComponent],
  imports: [CommonModule, CadastroProdutoRoutingModule, FormsModule, MatIconModule, ReactiveFormsModule],
})
export class CadastroProdutoModule {}
