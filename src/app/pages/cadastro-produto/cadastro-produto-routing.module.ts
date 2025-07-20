import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProdutoComponent } from './cadastro-produto.component';

const routes: Routes = [{ path: '', component: CadastroProdutoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroProdutoRoutingModule {}
