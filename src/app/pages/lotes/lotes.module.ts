import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LotesComponent } from './lotes.component';
import { CardInfoModule } from 'src/app/components/card-info/card-info.module';
import { ProductsTableModule } from 'src/app/components/products-table/products-table.module';
import { LotesRoutingModule } from './lotes-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [LotesComponent],
  imports: [CommonModule, ProductsTableModule, CardInfoModule, LotesRoutingModule, MatDialogModule, MatIconModule],
})
export class LotesModule {}
