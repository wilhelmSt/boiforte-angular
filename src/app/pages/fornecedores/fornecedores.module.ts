import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FornecedoresComponent } from './fornecedores.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CardInfoModule } from 'src/app/components/card-info/card-info.module';
import { ProductsTableModule } from 'src/app/components/products-table/products-table.module';
import { CardStatsModule } from 'src/app/components/card-stats/card-stats.module';
import { FornecedoresRoutingModule } from './fornecedores-routing.module';

@NgModule({
  declarations: [FornecedoresComponent],
  imports: [
    CommonModule,
    ProductsTableModule,
    CardInfoModule,
    MatDialogModule,
    MatIconModule,
    CardStatsModule,
    FornecedoresRoutingModule,
  ],
})
export class FornecedoresModule {}
