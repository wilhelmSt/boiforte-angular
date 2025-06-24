import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroCorteComponent } from './cadastro-corte.component';

const routes: Routes = [{ path: '', component: CadastroCorteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroCorteRoutingModule {}
