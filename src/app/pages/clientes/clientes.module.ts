import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ProductsTableModule } from 'src/app/components/products-table/products-table.module';
import { CardInfoModule } from 'src/app/components/card-info/card-info.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CardStatsModule } from 'src/app/components/card-stats/card-stats.module';

@NgModule({
  declarations: [ClientesComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ProductsTableModule,
    CardInfoModule,
    MatDialogModule,
    MatIconModule,
    CardStatsModule,
  ],
})
export class ClientesModule {}
