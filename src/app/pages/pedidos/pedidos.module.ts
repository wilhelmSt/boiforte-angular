import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from './pedidos.component';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { ProductsTableModule } from 'src/app/components/products-table/products-table.module';
import { CardInfoModule } from 'src/app/components/card-info/card-info.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CardStatsModule } from 'src/app/components/card-stats/card-stats.module';

@NgModule({
  declarations: [PedidosComponent],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    ProductsTableModule,
    CardInfoModule,
    MatDialogModule,
    MatIconModule,
    CardStatsModule,
  ],
})
export class PedidosModule {}
