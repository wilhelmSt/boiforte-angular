import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroFornecedorComponent } from './cadastro-fornecedor.component';

const routes: Routes = [{ path: '', component: CadastroFornecedorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroFornecedorRoutingModule {}
