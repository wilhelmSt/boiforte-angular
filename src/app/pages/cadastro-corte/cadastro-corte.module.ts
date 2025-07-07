import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroCorteComponent } from './cadastro-corte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CadastroCorteRoutingModule } from './cadastro-corte-routing.module';

@NgModule({
  declarations: [CadastroCorteComponent],
  imports: [CommonModule, CadastroCorteRoutingModule, FormsModule, MatIconModule, ReactiveFormsModule],
})
export class CadastroCorteModule {}
