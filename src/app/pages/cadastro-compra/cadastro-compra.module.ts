import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroCompraComponent } from './cadastro-compra.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroCompraRoutingModule } from './cadastro-compra-routing.module';

@NgModule({
  declarations: [CadastroCompraComponent],
  imports: [CommonModule, CadastroCompraRoutingModule, MatIconModule, ReactiveFormsModule, FormsModule],
})
export class CadastroCompraModule {}
