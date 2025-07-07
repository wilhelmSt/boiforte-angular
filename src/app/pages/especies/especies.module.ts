import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspeciesComponent } from './especies.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductsTableModule } from 'src/app/components/products-table/products-table.module';
import { EspeciesRoutingModule } from './especies-routing.module';

@NgModule({
  declarations: [EspeciesComponent],
  imports: [CommonModule, MatIconModule, EspeciesRoutingModule, MatDialogModule, ProductsTableModule],
})
export class EspeciesModule {}
