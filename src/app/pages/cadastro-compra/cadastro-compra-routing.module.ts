import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroCompraComponent } from './cadastro-compra.component';

const routes: Routes = [{ path: '', component: CadastroCompraComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroCompraRoutingModule {}
