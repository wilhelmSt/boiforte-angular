import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CortesComponent } from './cortes.component';
import { ProductsTableModule } from 'src/app/components/products-table/products-table.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CortesRoutingModule } from './cortes-routing.module';
import { CardInfoModule } from 'src/app/components/card-info/card-info.module';

@NgModule({
  declarations: [CortesComponent],
  imports: [CommonModule, MatIconModule, CortesRoutingModule, MatDialogModule, ProductsTableModule, CardInfoModule],
})
export class CortesModule {}
