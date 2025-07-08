import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CortesComponent } from './cortes.component';

const routes: Routes = [{ path: '', component: CortesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CortesRoutingModule {}
