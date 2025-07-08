import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductsTableModule } from 'src/app/components/products-table/products-table.module';
import { CardInfoModule } from 'src/app/components/card-info/card-info.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, MatIconModule, MatDialogModule, ProductsTableModule, CardInfoModule],
})
export class DashboardModule {}
