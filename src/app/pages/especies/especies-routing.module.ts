import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspeciesComponent } from './especies.component';

const routes: Routes = [{ path: '', component: EspeciesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspeciesRoutingModule {}
