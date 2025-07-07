import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroClienteComponent } from './cadastro-cliente.component';
import { CadastroClienteRoutingModule } from './cadastro-cliente-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CadastroClienteComponent],
  imports: [CommonModule, CadastroClienteRoutingModule, MatIconModule, FormsModule, ReactiveFormsModule],
})
export class CadastroClienteModule {}
